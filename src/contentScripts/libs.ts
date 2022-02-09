import { UrlType, Condition, Site } from "../types";
import { ExpungedTags } from "../const";
import { when } from "../logic";

export const isTargetSite = (location: Location, sites: Site[]): boolean => {
  const targets = sites
    .filter((site) => site.value)
    .concat([{ type: UrlType.URL, condition: Condition.StartsWith, value: "" }])
    .map((site) => ({
      ...site,
      target: site.type === UrlType.Domain ? location.hostname : location.href,
    }));

  const include = targets
    .filter(({ condition }) => !condition.startsWith("Not"))
    .reduce(
      (acc, { target, condition, value }) =>
        when(condition)
          .on(Condition.Equals, () => acc || target === value)
          .on(Condition.StartsWith, () => acc || target.startsWith(value))
          .otherwise(() => acc),
      false
    );

  const exclude = targets
    .filter(({ condition }) => condition.startsWith("Not"))
    .reduce(
      (acc, { target, condition, value }) =>
        when(condition)
          .on(Condition.NotEqual, () => acc && target !== value)
          .on(Condition.NotStartWith, () => acc && !target.startsWith(value))
          .otherwise(() => acc),
      true
    );

  return include && exclude;
};

const shouldBeMasked = (
  muteWords: string[],
  excludeWords: string[],
  node: Element
) => {
  const nodeText = Array.from(node.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .reduce((acc, n) => (acc += n.nodeValue), "")
    .toLowerCase();

  const mutes = muteWords
    .map((word) => word.toLowerCase())
    .filter((word) => nodeText.includes(word));
  const excludes = excludeWords
    .map((word) => word.toLowerCase())
    .filter((word) => nodeText.includes(word));
  return mutes.length > 0 && excludes.length === 0;
};

const createMaskedNode = (node: HTMLElement) => {
  const newNode = document.createElement(node.tagName);
  newNode.className = browser.runtime.id;
  newNode.style.fontStyle = "unset";
  newNode.style.textDecoration = "none";
  newNode.style.fontWeight = "unset";
  newNode.style.color = "unset";
  newNode.setAttribute("href", "javascript:void(0)");
  newNode.innerHTML = ExpungedTags.includes(node.tagName.toLowerCase())
    ? `<b>[${browser.i18n.getMessage("data_expunged")}]</b>`
    : "\u2588".repeat(node.innerText.length);

  return newNode;
};

export const maskTags = (
  muteWords: string[],
  excludeWords: string[],
  selector: string
) => {
  const targetNodes = document.querySelectorAll(selector);

  Array.from(targetNodes)
    .map((node) => node as HTMLElement)
    .filter((node) => shouldBeMasked(muteWords, excludeWords, node))
    .forEach((node) => {
      const newNode = createMaskedNode(node);
      const parent = node.parentNode;
      parent?.insertBefore(newNode, node);
      parent?.removeChild(node);

      newNode.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        parent?.insertBefore(node, newNode);
        parent?.removeChild(newNode);
      });
    });
};

export const unmaskTags = () => {
  const nodes = document.getElementsByClassName(browser.runtime.id);
  if (!nodes.length) {
    return;
  }

  const ev = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: false,
  });
  Array.from(nodes).forEach((node) => {
    node.dispatchEvent(ev);
    node.remove();
  });

  unmaskTags();
};

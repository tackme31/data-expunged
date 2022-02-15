import { DefaultSelector } from "../const";
import { when, getNodeText, getOptions } from "../logic";
import { Condition, MaskedHTMLElement, Site, UrlType } from "../types";

const isTargetSite = (location: Location, sites: Site[]): boolean => {
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
  if (node?.classList.contains(browser.runtime.id + "-original")) {
    return false;
  }

  const nodeText = getNodeText(node);
  const hasMuteWords = muteWords
    .map((word) => word.toLowerCase())
    .some((word) => nodeText.includes(word));
  const hasExcludeWords = excludeWords
    .map((word) => word.toLowerCase())
    .some((word) => nodeText.includes(word));
  return hasMuteWords && !hasExcludeWords;
};

const createMaskedText = (node: HTMLElement) => {
  const expungedTags = ["div", "blockquote", "p", "td", "li"];
  if (expungedTags.includes(node.tagName.toLowerCase())) {
    return `<b>[${browser.i18n.getMessage("data_expunged")}]</b>`;
  }

  const nodeText = getNodeText(node);
  if (nodeText.length > 15) {
    return `<b>[${browser.i18n.getMessage("data_expunged")}]</b>`;
  }

  return "\u2588".repeat(nodeText.length);
};

const createMaskedNode = (node: HTMLElement) => {
  const newNode = document.createElement(node.tagName);
  newNode.className = browser.runtime.id + "-black";
  newNode.style.fontStyle = "unset";
  newNode.style.textDecoration = "none";
  newNode.style.fontWeight = "unset";
  newNode.style.color = "unset";
  newNode.setAttribute("href", "javascript:void(0)");
  newNode.innerHTML = createMaskedText(node);

  return newNode as MaskedHTMLElement;
};

const maskTags = (
  muteWords: string[],
  excludeWords: string[],
  selector: string
) => {
  const targetNodes = document.querySelectorAll(selector);

  Array.from(targetNodes)
    .map((node) => node as HTMLElement)
    .filter((node) => shouldBeMasked(muteWords, excludeWords, node))
    .forEach((node) => {
      const maskedNode = createMaskedNode(node);
      const parent = node.parentNode as HTMLElement;
      parent?.insertBefore(maskedNode, node);
      parent?.removeChild(node);
      node.classList.add(browser.runtime.id + "-original");

      maskedNode.unmask = () => {
        parent?.insertBefore(node, maskedNode);
        parent?.removeChild(maskedNode);
        node?.classList.remove(browser.runtime.id + "-original");
      };

      maskedNode.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        parent?.insertBefore(node, maskedNode);
        parent?.removeChild(maskedNode);
      });
    });
};

export const censor = async () => {
  const { muteWords, excludeWords, targetSelector, targetSites } = await getOptions();
  if (!isTargetSite(window.location, targetSites || [])) {
    return;
  }

  maskTags(
    muteWords || [],
    excludeWords || [],
    targetSelector || DefaultSelector
  );
};

export const decensor = () => {
  const nodes = document.getElementsByClassName(browser.runtime.id + "-black");
  if (!nodes.length) {
    return;
  }

  Array.from(nodes)
    .map((node) => node as MaskedHTMLElement)
    .forEach((node) => {
      node.unmask();
      node.remove();
    });

  decensor();
};
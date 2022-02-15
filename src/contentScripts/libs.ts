import { DefaultSelector } from "../const";
import { when } from "../logic";
import { Condition, MaskedHTMLElement, Options, Site, UrlType } from "../types";

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

const getNodeText = (node: Element) =>
  Array.from(node.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .reduce((acc, n) => (acc += n.nodeValue), "")
    .toLowerCase();

const shouldBeMasked = (
  muteWords: string[],
  excludeWords: string[],
  node: Element
) => {
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
  const ExpungedTags = ["div", "blockquote", "p", "td", "li"];
  if (ExpungedTags.includes(node.tagName.toLowerCase())) {
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
  newNode.className = browser.runtime.id;
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
      const parent = node.parentNode;
      parent?.insertBefore(maskedNode, node);
      parent?.removeChild(node);

      maskedNode.unmask = () => {
        parent?.insertBefore(node, maskedNode);
        parent?.removeChild(maskedNode);
      };

      maskedNode.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        maskedNode.unmask();
      });
    });
};

const unmaskTags = () => {
  const nodes = document.getElementsByClassName(browser.runtime.id);
  if (!nodes.length) {
    return;
  }

  Array.from(nodes)
    .map((node) => node as MaskedHTMLElement)
    .forEach((node) => {
      node.unmask();
      node.remove();
    });

  unmaskTags();
};

export const censor = ({
  muteWords,
  excludeWords,
  targetSelector,
  targetSites,
}: Options) => {
  unmaskTags();
  if (!isTargetSite(window.location, targetSites || [])) {
    return;
  }

  maskTags(
    muteWords || [],
    excludeWords || [],
    targetSelector || DefaultSelector
  );
};

export const getOptions = async () => {
  const options = (await browser.storage.local.get([
    "muteWords",
    "excludeWords",
    "targetSelector",
    "targetSites",
  ])) as Options;

  return options || {};
};

import { DefaultSelector, ExpungedTags } from "../const";
import type { Options } from "../types";
import { UrlType, Condition, Site } from "../types";

const isTargetSite = (location: Location, sites: Site[]): boolean => {
  const result = sites
    .filter((site) => site.value)
    .concat([{ type: UrlType.URL, condition: Condition.StartsWith, value: "" }])
    .map((site) => ({
      ...site,
      target: site.type === UrlType.Domain ? location.hostname : location.href,
    }))
    .reduce(
      (acc, { target, condition, value }) => {
        switch (condition) {
          case Condition.Equals:
            return {
              ...acc,
              include: acc.include || target === value,
            };
          case Condition.StartsWith:
            return {
              ...acc,
              include: acc.include || target.startsWith(value),
            };
          case Condition.NotEqual:
            return {
              ...acc,
              exclude: acc.exclude && target !== value,
            };
          case Condition.NotStartWith:
            return {
              ...acc,
              exclude: acc.exclude && !target.startsWith(value),
            };
          default:
            return acc;
        }
      },
      { exclude: true, include: false }
    );

  return result.exclude && result.include;
};

const shouldMute = (
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

const censorText = (
  muteWords: string[],
  excludeWords: string[],
  selector: string
) => {
  const targetNodes = document.querySelectorAll(selector);

  Array.from(targetNodes)
    .map((node) => node as HTMLElement)
    .filter((node) => shouldMute(muteWords, excludeWords, node))
    .forEach((node) => {
      const newNode = document.createElement(node.tagName);
      newNode.style.fontStyle = "unset";
      newNode.style.textDecoration = "none";
      newNode.style.fontWeight = "unset";
      newNode.style.color = "unset";
      newNode.setAttribute("href", "javascript:void(0)");
      newNode.innerHTML = ExpungedTags.includes(node.tagName.toLowerCase())
        ? `<b>[${browser.i18n.getMessage("data_expunged")}]</b>`
        : "\u2588".repeat(node.innerText.length);

      const parent = node.parentNode;
      parent?.insertBefore(newNode, node);
      parent?.removeChild(node);

      newNode.addEventListener("click", () => {
        parent?.insertBefore(node, newNode);
        parent?.removeChild(newNode);
      });
    });
};

(async () => {
  const options = (await browser.storage.local.get([
    "muteWords",
    "excludeWords",
    "targetSelector",
    "targetSites",
  ])) as Options;
  if (!options) {
    return;
  }

  const { muteWords, excludeWords, targetSelector, targetSites } =
    options as Options;
  if (!isTargetSite(window.location, targetSites || [])) {
    return;
  }

  censorText(
    muteWords || [],
    excludeWords || [],
    targetSelector || DefaultSelector
  );
})();

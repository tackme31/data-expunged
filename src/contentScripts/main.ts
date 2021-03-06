import { DefaultSelector } from "../const";
import { when, getNodeText, getTimeLeft } from "../logic";
import { Condition, MaskedHTMLElement, Options, Site, UrlType } from "../types";

export const isTargetSite = (sites: Site[]): boolean => {
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
  const expungedTags = ["div", "blockquote", "p", "td", "li", "dd"];
  if (expungedTags.includes(node.tagName.toLowerCase())) {
    return `<b>[${browser.i18n.getMessage("data_expunged")}]</b>`;
  }

  const nodeText = getNodeText(node);
  if (nodeText.length > 50) {
    return `<b>[${browser.i18n.getMessage("data_expunged")}]</b>`;
  }
  
  const length = Math.min(nodeText.length, 15);
  return "\u2588".repeat(length);
};

const createMaskedNode = (node: HTMLElement) => {
  const newNode = document.createElement(node.tagName);
  newNode.className = node.className;
  newNode.classList.add(browser.runtime.id + "-black");
  newNode.setAttribute("href", "javascript:void(0)");
  newNode.innerHTML = createMaskedText(node);

  if (node.tagName === 'A') {
    newNode.style.fontStyle = "unset";
    newNode.style.textDecoration = "none";
    newNode.style.fontWeight = "unset";
    newNode.style.color = "unset";
  }

  return newNode as MaskedHTMLElement;
};

const getSelectorNodes = (selector: string) => {
  try {
    const nodes = document.querySelectorAll(selector);
    return Array.from(nodes);
  } catch {
    return [];
  }
}

const maskTags = (
  muteWords: string[],
  excludeWords: string[],
  selector: string
) => {
  getSelectorNodes(selector)
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

export const censor = async (options: Omit<Options, "targetSites">) => {
  const { muteWords, excludeWords, targetSelector } = options
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

export const observe = (options: Options) => {
  let timeout: NodeJS.Timeout | null = null;
  const mutationObserver = new MutationObserver((mutations) => {
    const isUnmask = mutations.some((mutation) =>
      Array.from(mutation.removedNodes)
        .map((node) => node as HTMLElement)
        .some((node) => node?.classList?.contains(browser.runtime.id))
    );
    if (isUnmask) {
      return;
    }

    if (!timeout) {
      timeout = setTimeout(async () => {
        await censor(options);
        timeout = null;
      }, 500);
      return;
    }

    // Ignore >500ms for performance.
    const timeLeft = getTimeLeft(timeout);
    if (timeout !== null && timeLeft < 500) {
      clearTimeout(timeout);
      timeout = null;
      return;
    }
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return mutationObserver;
};
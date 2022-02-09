import { DefaultSelector } from "../const";
import type { Options } from "../types";
import { isTargetSite, maskTags, unmaskTags } from "./libs";

const censor = ({
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

  censor(options);

  browser.storage.onChanged.addListener((changes) => {
    const muteWords = changes.muteWords?.newValue || options.muteWords;
    const excludeWords = changes.excludeWords?.newValue || options.excludeWords;
    const targetSelector =
      changes.targetSelector?.newValue || options.targetSelector;
    const targetSites = changes.targetSites?.newValue || options.targetSites;
    censor({
      muteWords,
      excludeWords,
      targetSelector,
      targetSites,
    });
  });
})();

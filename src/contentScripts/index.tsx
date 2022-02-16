import { censor, decensor, isTargetSite, observe } from "./main";
import { getOptions } from "../logic";

(async () => {
  const options = await getOptions();
  const enabled = isTargetSite(options.targetSites || []);
  let observer: MutationObserver;
  if (enabled) {
    await censor(options);
    observer = observe(options);
  }

  browser.storage.onChanged.addListener(async () => {
    observer?.disconnect();

    const options = await getOptions();
    const enabled = isTargetSite(options.targetSites || []);
    if (enabled) {
      await censor(options);
      observer = observe(options);
    } else {
      decensor();
    }
  });
})();

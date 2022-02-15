import { censor, decensor } from "./main";
import { getTimeLeft } from "../logic";

// re-censor when options are updated.
browser.storage.onChanged.addListener(async () => {
  decensor();
  await censor();
});

// censor when dom is ready.
(async () => await censor())();

// censor when DOM is changed.
(() => {
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
        await censor();
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
})();
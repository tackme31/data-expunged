import { Options } from "../types";

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.contextMenus.create({
  id: "add-to-hide-words",
  title: browser.i18n.getMessage("add_to_hide_words"),
  contexts: ["selection"],
  type: "normal",
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "add-to-hide-words") {
    return;
  }

  if (!info.selectionText) {
    return;
  }

  const { muteWords } = await browser.storage.local.get([ "muteWords" ]) as Partial<Options>;
  browser.storage.local.set({
    muteWords: [
      ...(muteWords || []),
      info.selectionText
    ]
  });
});
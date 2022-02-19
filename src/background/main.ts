import { getOptions } from "../logic";
import * as i18n from "./i18n";

if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

const menuItemId = "add-to-hide-words";
browser.contextMenus.create({
  id: menuItemId,
  title: i18n.getMessage("add_to_hide_words"),
  contexts: ["selection"],
  type: "normal",
});

browser.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== menuItemId) {
    return;
  }

  if (!info.selectionText) {
    return;
  }

  const { muteWords } = await getOptions();
  if (muteWords && muteWords.includes(info.selectionText)) {
    return;
  }

  browser.storage.local.set({
    muteWords: [...(muteWords || []), info.selectionText],
  });
});

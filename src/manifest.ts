import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import type PkgType from "../package.json";
import { isDev, port, r } from "../scripts/utils";

type ManifestV3 = Manifest.WebExtensionManifest & {
  host_permissions?: string[];
};

export async function getManifest() {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: ManifestV3 = {
    manifest_version: 3,
    name: "__MSG_Name__",
    version: pkg.version,
    default_locale: "en",
    description: "__MSG_Description__",
    action: {
      default_icon: "./assets/icons/128x128.png",
      default_popup: "./dist/popup/index.html",
    },
    options_ui: {
      page: "./dist/options/index.html",
      open_in_tab: true,
    },
    background: {
      service_worker: "./dist/background/index.global.js"
    },
    icons: {
      16: "./assets/icons/16x16.png",
      48: "./assets/icons/48x48.png",
      128: "./assets/icons/128x128.png",
    },
    permissions: ["tabs", "storage", "activeTab", "downloads", "contextMenus"],
    host_permissions: ["http://*/", "https://*/"],
    content_scripts: [
      {
        matches: ["http://*/*", "https://*/*"],
        js: ["./dist/contentScripts/index.global.js"],
      },
    ],
  };

  if (isDev) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts;
    manifest.permissions?.push("webNavigation");

    // this is required on dev for Vite script to load
    manifest.content_security_policy = `script-src \'self\' http://localhost:${port}; object-src \'self\'`;
  }

  return manifest;
}

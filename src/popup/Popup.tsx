import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useChromeStorage, getOptions } from "../logic";
import { Site, UrlType, Condition } from "../types";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const getCurrentPageUrl = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tabs.length || tabs[0].url === undefined) {
    return;
  }

  return new URL(tabs[0].url);
};

export function Popup() {
  const [isTargetSite, setIsTargetSite] = useState(false);
  const [isTargetPage, setIsTargetPage] = useState(false);
  const [targetSites, setTargetSites] = useChromeStorage<Site[]>(
    "targetSites",
    []
  );

  useEffect(() => {
    const checkDisabled = async () => {
      const url = await getCurrentPageUrl();
      if (!url) {
        return;
      }

      // Hooks' targetSites is empty at this time. So get directly from storage.
      const { targetSites: sites } = await getOptions();
      const existingSite = sites?.some(
        (site) =>
          site.type === UrlType.Domain &&
          site.condition === Condition.NotEqual &&
          site.value === url.hostname
      );

      const existingPage = sites?.some(
        (site) =>
          site.type === UrlType.URL &&
          site.condition === Condition.NotEqual &&
          site.value === url.toString()
      );

      setIsTargetSite(existingSite);
      setIsTargetPage(existingPage);
    };

    checkDisabled();
  }, []);

  const toggleDisabled = async (
    type: UrlType,
    getValue: (url: URL) => string,
    setState: (state: boolean) => void
  ) => {
    const url = await getCurrentPageUrl();
    if (!url) {
      return;
    }
    const existing = targetSites.find(
      (site) =>
        site.type === type &&
        site.condition === Condition.NotEqual &&
        site.value === getValue(url)
    );

    setState(!existing);
    if (existing) {
      setTargetSites(targetSites.filter((site) => site !== existing));
    } else {
      setTargetSites([
        ...targetSites,
        {
          type: type,
          condition: Condition.NotEqual,
          value: getValue(url),
        },
      ]);
    }
  };

  return (
    <div style={{ width: "15.5rem" }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => browser.runtime.openOptionsPage()}
      >
        {browser.i18n.getMessage("go_to_option_page")}
      </Button>
      <FormControlLabel
        control={<Switch checked={isTargetSite} />}
        onClick={() =>
          toggleDisabled(UrlType.Domain, (url) => url.hostname, setIsTargetSite)
        }
        label={browser.i18n.getMessage("disable_on_this_site")}
        style={{ margin: "auto" }}
      />
      <FormControlLabel
        control={<Switch checked={isTargetPage} />}
        onClick={() =>
          toggleDisabled(UrlType.URL, (url) => url.toString(), setIsTargetPage)
        }
        label={browser.i18n.getMessage("disable_on_this_page")}
        style={{ margin: "auto" }}
      />
    </div>
  );
}

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Container } from "./style";
import { useChromeStorage } from "../logic";
import { Site, UrlType, Condition } from "../types";

export function Popup() {
  const [targetSites, setTargetSites] = useChromeStorage<Site[]>(
    "targetSites",
    []
  );
  const [snackbarOpened, setSnackbarOpened] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleOnClick = async (type: "site" | "page") => {
    const tabs = await browser.tabs.query({
      active: true,
    });

    if (!tabs.length || tabs[0].url === undefined) {
      return;
    }

    const url = new URL(tabs[0].url);
    const existing =
      type === "page"
        ? targetSites.find(
            (site) =>
              site.type === UrlType.URL &&
              site.condition === Condition.NotEqual &&
              site.value === url.toString()
          )
        : targetSites.find(
            (site) =>
              site.type === UrlType.Domain &&
              site.condition === Condition.NotEqual &&
              site.value === url.hostname
          );
    if (existing) {
      setSnackbarMessage(`This ${type} has already been added.`);
      setSnackbarOpened(true);
      return;
    }

    setTargetSites([
      ...targetSites,
      {
        type: type === "page" ? UrlType.URL : UrlType.Domain,
        condition: Condition.NotEqual,
        value: type === "page" ? url.toString() : url.hostname,
      },
    ]);

    setSnackbarMessage("Added.");
    setSnackbarOpened(true);
  };
  return (
    <Container style={{ width: "200px" }}>
      <header className="App-header">
        <Button
          fullWidth
          variant="outlined"
          onClick={() => browser.runtime.openOptionsPage()}
        >
          Go to option page.
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleOnClick("site")}
        >
          Disable on this site.
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleOnClick("page")}
        >
          Disable on this page.
        </Button>
        <Snackbar
          open={snackbarOpened}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpened(false)}
          onClick={() => setSnackbarOpened(false)}
          message={snackbarMessage}
        />
      </header>
    </Container>
  );
}

import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TargetWordList from "./TargetWordList";
import TargetSiteList from "./TargetSiteList";
import TargetSelector from "./TargetSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: "25px",
      width: "100%",
    },
    content: {
      marginTop: "40px",
      margin: "auto",
    },
    pageTitle: {
      color: "#901",
      fontSize: "1.75rem",
      borderBottom: "1px solid #bbb",
      paddingBottom: "8px",
    },
    header: {
      marginTop: "50px",
      fontSize: "100%",
    },
  })
);

export const Options = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.pageTitle}>
          {browser.i18n.getMessage("options_title")}
        </div>
        <div className={classes.content}>
          <div>
            <h2 className={classes.header}>
              {browser.i18n.getMessage("target_words")}:
            </h2>
            <TargetWordList
              label={browser.i18n.getMessage("words_to_hide")}
              storageKey="muteWords"
            />
            <TargetWordList
              label={browser.i18n.getMessage("words_to_exclude")}
              storageKey="excludeWords"
            />
          </div>
          <div>
            <h2 className={classes.header}>
              {browser.i18n.getMessage("target_selector")}:
            </h2>
            <TargetSelector />
          </div>
          <div>
            <h2 className={classes.header}>
              {browser.i18n.getMessage("target_sites")}:
            </h2>
            <TargetSiteList />
          </div>
        </div>
      </div>
    </>
  );
};

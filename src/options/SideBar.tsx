import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideBlock: {
      border: "1px solid #600",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgb(102 0 0 / 50%)",
      background: "#fff",
      width: "190px",
      padding: "10px",
    },
    menuItem: {
      color: "#b01",
      textDecoration: "none",
      fontWeight: 700,
      marginLeft: "5px",
    },
    menuHeader: {
      color: "#600",
      borderBottom: "solid 1px #600",
      paddingLeft: "15px",
      marginTop: "20px",
      marginBottom: "5px",
      fontSize: "8pt",
      fontWeight: "bold",
      lineHeight: "0px",
    },
    line: {
      margin: ".8rem 1.8rem",
    },
  })
);

export const SideBar = () => {
  const classes = useStyles();
  return (
    <>
      <div>
        <div
          className={classes.sideBlock}
          style={{
            backgroundColor: "#a7dba2",
          }}
        >
          <a className={classes.menuItem} href="#link-to-readme">
            &#x25B7; {browser.i18n.getMessage("about")}
          </a>
        </div>
        <hr className={classes.line} />
        <div className={classes.sideBlock}>
          <div>
            <a className={classes.menuItem} href="#link-to-extension-page">
              &#x2302; {browser.i18n.getMessage("home")}
            </a>
          </div>
          <div className={classes.menuHeader}>
            <p>{browser.i18n.getMessage("options")}</p>
          </div>
          <ImportButton className={classes.menuItem} />
          <ExportButton className={classes.menuItem} />
          <div className={classes.menuHeader}>
            <p>{browser.i18n.getMessage("source")}</p>
          </div>
          <div>
            <a
              className={classes.menuItem}
              href="https://github.com/tackme31/data-expunged"
              target="_blank"
            >
              &#x1F5CE; {browser.i18n.getMessage("repository")}
            </a>
          </div>
          <div>
            <a
              className={classes.menuItem}
              href="https://github.com/tackme31/data-expunged/issues"
              target="_blank"
            >
              &#x1F5CE; {browser.i18n.getMessage("bug_report")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

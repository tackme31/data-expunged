import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import TargetSite from "./TargetSite";
import { useChromeStorage } from "../logic";
import { Site, UrlType, Condition } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: "2rem",
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      width: "100%",
    },
  })
);

const TargetSiteList = () => {
  const classes = useStyles();
  const [targetSites, setTargetSites] = useChromeStorage<Site[]>(
    "targetSites",
    [{ type: UrlType.Domain, condition: Condition.Equals, value: "" }]
  );

  const addNewSite = () => {
    setTargetSites([
      ...targetSites,
      { type: UrlType.Domain, condition: Condition.Equals, value: "" },
    ]);
  };

  const deleteSite = (index: number) => {
    const newList = [...targetSites];
    newList.splice(index, 1);
    setTargetSites(newList);
  };

  const updateSites = (site: Site, index: number) => {
    const newList = [...targetSites];
    newList[index] = site;
    setTargetSites(newList);
  };

  return (
    <div className={classes.root}>
      {targetSites.map((site, i) => (
        <li key={i} className={classes.list}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteSite(i)}
          >
            <DeleteIcon />
          </IconButton>
          <TargetSite site={site} onChange={(s) => updateSites(s, i)} />
        </li>
      ))}
      <IconButton aria-label="add" onClick={() => addNewSite()} size="small">
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default TargetSiteList;

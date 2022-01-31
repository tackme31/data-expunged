import React from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import NativeSelect from "@material-ui/core/NativeSelect";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Site, UrlType, Condition } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    text: {
      position: "relative",
      backgroundColor: "transparent",
      padding: "8px 2px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
    textInput: {
      fontSize: "0.8125rem",
    },
    type: {
      width: "5.5rem",
      fontSize: "0.8125rem",
    },
    condition: {
      width: "10rem",
      fontSize: "0.8125rem",
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

interface Props {
  site: Site;
  onChange: (site: Site) => void;
}

const TargetSite = ({ site, onChange }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <Select
          value={site.type}
          className={classes.type}
          onChange={(e) =>
            onChange({ ...site, type: e.target.value as UrlType })
          }
        >
          <MenuItem value={UrlType.Domain}>
            {browser.i18n.getMessage("domain")}
          </MenuItem>
          <MenuItem value={UrlType.URL}>
            {browser.i18n.getMessage("url")}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <NativeSelect
          value={site.condition}
          className={classes.condition}
          onChange={(e) =>
            onChange({ ...site, condition: e.target.value as Condition })
          }
        >
          <option value={Condition.Equals}>
            {browser.i18n.getMessage("is_equal_to")}
          </option>
          <option value={Condition.NotEqual}>
            {browser.i18n.getMessage("is_not_equal_to")}
          </option>
          <option value={Condition.StartsWith}>
            {browser.i18n.getMessage("starts_with")}
          </option>
          <option value={Condition.NotStartWith}>
            {browser.i18n.getMessage("does_not_starts_with")}
          </option>
        </NativeSelect>
      </FormControl>
      <FormControl>
        <TextField
          className={classes.text}
          value={site.value}
          onChange={(e) =>
            onChange({ ...site, value: e.target.value as string })
          }
          InputProps={{
            classes: { input: classes.textInput },
          }}
        />
      </FormControl>
    </div>
  );
};

export default TargetSite;

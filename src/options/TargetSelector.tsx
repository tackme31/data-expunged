import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useChromeStorage } from "../logic";
import { DefaultSelector } from "../const";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      position: "relative",
      backgroundColor: "transparent",
      padding: "8px 2px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
    textInput: {
      fontSize: "0.8125rem",
      fontFamily: '"Courier New", Consolas, monospace',
    },
    control: {
      width: "100%",
    },
  })
);

const TargetSelector = () => {
  const classes = useStyles();
  const [targetSelector, setTargetSelector] = useChromeStorage<string>(
    "targetSelector",
    DefaultSelector
  );
  return (
    <FormControl className={classes.control}>
      <TextField
        label={browser.i18n.getMessage("Selector")}
        value={targetSelector}
        className={classes.text}
        onChange={(e) => setTargetSelector(e.target.value)}
        InputProps={{
          classes: { input: classes.textInput },
        }}
        size="small"
        fullWidth
      />
    </FormControl>
  );
};

export default TargetSelector;

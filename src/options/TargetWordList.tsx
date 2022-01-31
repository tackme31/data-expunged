import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useChromeStorage } from "../logic";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
      backgroundColor: "transparent",
      minHeight: "2rem",
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    label: {
      fontSize: "0.8125rem",
    },
  })
);

interface Props {
  label: string;
  storageKey: string;
}

const TargetWordList = ({ label, storageKey }: Props) => {
  const classes = useStyles();
  const [currentWord, setCurrentWord] = useState<string>("");
  const [muteWords, setMuteWords] = useChromeStorage<string[]>(storageKey, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const word = currentWord.trim();
    if (e.key !== "Enter" || !word) {
      return;
    }

    setMuteWords([...muteWords, word]);
    setCurrentWord("");
  };

  const handleOnDelete = (word: string) => {
    const newValue = muteWords.filter((muteWord) => muteWord !== word);
    setMuteWords(newValue);
  };

  return (
    <>
      <TextField
        label={label}
        value={currentWord}
        onChange={(e) => setCurrentWord(e.target.value)}
        onKeyDown={handleKeyDown}
        InputLabelProps={{
          className: classes.label,
        }}
        size="small"
      />
      <Paper component="ul" className={classes.root} elevation={0}>
        {muteWords.map((word, i) => (
          <Chip
            label={word}
            className={classes.chip}
            size="small"
            onDelete={() => handleOnDelete(word)}
          />
        ))}
      </Paper>
    </>
  );
};

export default TargetWordList;

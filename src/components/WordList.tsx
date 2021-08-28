import React, { useState } from 'react'

import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			listStyle: 'none',
			padding: theme.spacing(0.5),
			margin: 0,
			backgroundColor: 'transparent',
			minHeight: '2rem'
		},
		chip: {
			margin: theme.spacing(0.5),
		},
	}),
)

interface IOwnProps {
	label: string
	list: string[]
	onAdd: (word: string) => void
	onDelete: (word: string) => void
}

const WordListField = ({ label, list, onAdd, onDelete }: IOwnProps) => {
	const classes = useStyles()
	const [currentWord, setCurrentWord] = useState<string>('')

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const word = currentWord.trim()
		if (e.key !== 'Enter' || !word) {
			return
		}

		onAdd(word)
		setCurrentWord('')
	}
	
	return (
		<>
			<TextField
				label={label}
				value={currentWord}
				onChange={(e) => setCurrentWord(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Paper component="ul" className={classes.root} elevation={0}>
				{list.map((word, i) => (
					<li key={i}>
						<Chip
							label={word}
							className={classes.chip}
							size="small"
							onDelete={() => onDelete(word)}
						/>
					</li>
				))}
			</Paper>
		</>
	)
}

export default WordListField
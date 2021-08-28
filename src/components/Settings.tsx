import { useEffect } from 'react'
import ColorPicker from 'material-ui-color-picker'
import { useDispatch, useSelector } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import AutoComplete from '@material-ui/lab/Autocomplete'

import { HideableTags } from '../const'
import {
    addMuteWordAction, deleteMuteWordAction,
    updateColorAction, updateHtmlTagsAction,
	restoreSettingsAction
} from '../store/actions'
import { RootState } from '../store/store'
import SaveButton from './SaveButton'
import UrlMatchList from './UrlMatchList'
import WordList from './WordList'
import { SettingsState } from '../store/types'

const Settings = () => {
	const dispatch = useDispatch()
	const { color, muteWords, excludeWords, tags } = useSelector((state: RootState) => state.settings)

	useEffect(() => {
		chrome.storage.local.get(['settings'], (value) => {
			const settings = value.settings as SettingsState
			if (!settings) {
				return
			}

			dispatch(restoreSettingsAction(settings))
		})
	}, [])

	return (
		<>
			<div>
				<h2>Mute words</h2>
				<WordList 
				  	label="Words to hide"
					list={muteWords}
					onAdd={(word) => dispatch(addMuteWordAction(word))}
					onDelete={(word) => dispatch(deleteMuteWordAction(word))}
				/>
				{/* No supported now
				<WordList
				    label="Exclude words"
					list={excludeWords}
					onAdd={(word) => dispatch(addExcludeWordAction(word))}
					onDelete={(word) => dispatch(deleteExcludeWordAction(word))}
				/>
				*/}
			</div>
			<div>
				<h2>HTML tags</h2>
				<AutoComplete
					defaultValue={tags}
					options={HideableTags}
					value={tags}
					onChange={(_, values) => dispatch(updateHtmlTagsAction(values))}
					size="small"
					multiple
					filterSelectedOptions
					disableCloseOnSelect
					renderInput={(params) => (
						<TextField {...params} />
					)}
				/>
			</div>
			<div>
				<h2>Color</h2>
				<ColorPicker
				    value={color}
					label="Color"
					onChange={(e) => dispatch(updateColorAction(e))}
					InputProps={{ value: color, style: { color: color }}}
				/>
			</div>
			<div>
				<h2>Sites sites</h2>
				<UrlMatchList />
			</div>
			<div>
				<SaveButton />
			</div>
		</>
	)
}

export default Settings
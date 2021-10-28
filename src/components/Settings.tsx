import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete';

import { HideableTags } from '../const';
import {
    addExcludeWordAction, addMuteWordAction, deleteExcludeWordAction, deleteMuteWordAction,
    restoreSettingsAction, updateHtmlTagsAction
} from '../store/actions';
import { RootState } from '../store/store';
import { SettingsState } from '../store/types';
import SaveButton from './SaveButton';
import UrlMatchList from './UrlMatchList';
import WordList from './WordList';

const Settings = () => {
	const dispatch = useDispatch()
	const { muteWords, excludeWords, tags } = useSelector((state: RootState) => state.settings)

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
				<h2>{chrome.i18n.getMessage('target_words')}</h2>
				<WordList 
				  label={chrome.i18n.getMessage('words_to_hide')}
					list={muteWords}
					onAdd={(word) => dispatch(addMuteWordAction(word))}
					onDelete={(word) => dispatch(deleteMuteWordAction(word))}
				/>
				<WordList
				  label={chrome.i18n.getMessage('words_to_exclude')}
					list={excludeWords}
					onAdd={(word) => dispatch(addExcludeWordAction(word))}
					onDelete={(word) => dispatch(deleteExcludeWordAction(word))}
				/>
			</div>
			<div>
				<h2>{chrome.i18n.getMessage('target_tags')}</h2>
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
				<h2>{chrome.i18n.getMessage('target_sites')}</h2>
				<UrlMatchList />
			</div>
			<div>
				<SaveButton />
			</div>
		</>
	)
}

export default Settings
import { ActionTypes } from './actionTypes'
import { SettingsState, SettingsActionTypes } from './types'
import { HideableTags } from '../const'

const initialState: SettingsState = {
    muteWords: [],
    excludeWords: [],
    urlMatches: [],
    tags: [...HideableTags]
}

export const settingsReducer = (state = initialState, action: SettingsActionTypes): SettingsState => {
    switch (action.type) {
        case ActionTypes.addMuteWord: {
            return {
                ...state,
                muteWords: [...state.muteWords, action.payload.word]
            }
        }
        case ActionTypes.deleteMuteWord: {
            return {
                ...state,
                muteWords: state.muteWords.filter(w => w !== action.payload.word)
            }
        }
        case ActionTypes.addExcludeWord: {
            return {
                ...state,
                excludeWords: [...state.excludeWords, action.payload.word]
            }
        }
        case ActionTypes.deleteExcludedWord: {
            return {
                ...state,
                excludeWords: state.excludeWords.filter(w => w !== action.payload.word)
            }
        }
        case ActionTypes.updateUrlMatch: {
            const newList = [...state.urlMatches]
            newList[action.payload.index] = action.payload.match
            return {
                ...state,
                urlMatches: newList
            }
        }
        case ActionTypes.addNewUrlMatch: {
            return {
                ...state,
                urlMatches: [
                    ...state.urlMatches,
                    { type: 'Domain', condition: 'Equals' , value: '' }
                ]
            }
        }
        case ActionTypes.deleteUrlMatch: {
            const newList = [...state.urlMatches]
            newList.splice(action.payload.index, 1)    
            return {
                ...state,
                urlMatches: newList
            }
        }
        case ActionTypes.updateHtmlTags: {
            return {
                ...state,
                tags: action.payload.tags
            }
        }
        case ActionTypes.restoreSettings: {
            return {
                ...state,
                ...action.payload.settings
            }
        }
        default:
            return state
    }
}
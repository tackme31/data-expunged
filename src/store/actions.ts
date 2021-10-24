import { ActionTypes } from './actionTypes'
import { SettingsActionTypes, IUrlMatch, SettingsState } from './types'

export const addMuteWordAction = (word: string): SettingsActionTypes => {
    return {
        type: ActionTypes.addMuteWord,
        payload: {
            word: word
        }
    }
}

export const deleteMuteWordAction = (word: string): SettingsActionTypes => {
    return {
        type: ActionTypes.deleteMuteWord,
        payload: {
            word: word
        }
    }
}

export const addExcludeWordAction = (word: string): SettingsActionTypes => {
    return {
        type: ActionTypes.addExcludeWord,
        payload: {
            word: word
        }
    }
}

export const deleteExcludeWordAction = (word: string): SettingsActionTypes => {
    return {
        type: ActionTypes.deleteExcludedWord,
        payload: {
            word: word
        }
    }
}

export const updateUrlMatchAction = (match: IUrlMatch, index: number): SettingsActionTypes => {
    return {
        type: ActionTypes.updateUrlMatch,
        payload: {
            index: index,
            match: match
        }
    }
}

export const addNewUrlMatchAction = (): SettingsActionTypes => {
    return {
        type: ActionTypes.addNewUrlMatch,
        payload: {}
    }
}

export const deleteUrlMatchAction = (index: number): SettingsActionTypes => {
    return {
        type: ActionTypes.deleteUrlMatch,
        payload: {
            index: index
        }
    }
}

export const updateHtmlTagsAction = (tags: string[]): SettingsActionTypes => {
    return {
        type: ActionTypes.updateHtmlTags,
        payload: {
            tags: tags
        }
    }
}

export const restoreSettingsAction = (settings: SettingsState): SettingsActionTypes => {
    return {
        type: ActionTypes.restoreSettings,
        payload: {
            settings: settings
        }
    }
}
import { Action } from 'redux'
import { ActionTypes } from './actionTypes'

export type TargetType = 'URL' | 'Domain'
export type TargetCondition = 'Equals' | 'NotEqual' | 'StartsWith' | 'NotStartWith'
export interface IUrlMatch {
  type: TargetType
  condition: TargetCondition
  value: string
}

export type SettingsState = {
    muteWords: string[]
    excludeWords: string[]
    urlMatches: IUrlMatch[]
    tags: string[]
}

interface IAddMuteWordAction extends Action {
    type: typeof ActionTypes.addMuteWord
    payload: {
        word: string
    }
}

interface IDeleteMuteWordAction extends Action {
    type: typeof ActionTypes.deleteMuteWord
    payload: {
        word: string
    }
}

interface IAddExcludeWordAction extends Action {
    type: typeof ActionTypes.addExcludeWord
    payload: {
        word: string
    }
}

interface IDeleteExcludeWordAction extends Action {
    type: typeof ActionTypes.deleteExcludedWord
    payload: {
        word: string
    }
}

interface IUpdateUrlMatchAction extends Action {
    type: typeof ActionTypes.updateUrlMatch
    payload: {
        match: IUrlMatch,
        index: number
    }
}

interface IAddNewUrlMatchAction extends Action {
    type: typeof ActionTypes.addNewUrlMatch,
    payload: { }
}

interface IDeleteUrlMatchAction extends Action {
    type: typeof ActionTypes.deleteUrlMatch
    payload: {
        index: number,
    }
}

interface IUpdateHtmlTagsAction extends Action {
    type: typeof ActionTypes.updateHtmlTags,
    payload: {
        tags: string[],
    }
}

interface IRestoreSettingsAction extends Action {
    type: typeof ActionTypes.restoreSettings,
    payload: {
        settings: SettingsState
    }
}

export type SettingsActionTypes =
      IAddMuteWordAction
    | IDeleteMuteWordAction
    | IAddExcludeWordAction
    | IDeleteExcludeWordAction
    | IUpdateUrlMatchAction
    | IAddNewUrlMatchAction
    | IDeleteUrlMatchAction
    | IUpdateHtmlTagsAction
    | IRestoreSettingsAction
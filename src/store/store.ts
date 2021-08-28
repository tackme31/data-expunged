import { combineReducers, createStore, compose, applyMiddleware} from 'redux'
import { SettingsState } from './types'
import { settingsReducer } from './reducer'

export type AppState = {
  state: SettingsState
}

const rootReducer = combineReducers({
  settings: settingsReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store
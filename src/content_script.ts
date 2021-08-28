import { setColorStyle, isOptionPage, } from './libs'
import type { SettingsState, IUrlMatch } from './store/types'


const isTargetSite = (location: Location, matches: IUrlMatch[]): boolean => {
    if (!matches.length) {
        return true
    }

    const result = matches.reduce((acc, { type, condition, value }): boolean => {
        const target = type === 'Domain' ? location.hostname : location.href
        switch (condition) {
            case 'Equals': {
                return acc || target === value
            }
            case 'NotEqual': {
                return acc || target !== value
            }
            case 'StartsWith': {
                return acc || target.startsWith(value)
            }
            case 'NotStartWith': {
                return acc || !target.startsWith(value)
            }
            default: {
                return acc
            }
        }
    }, false)

    return result
}

window.addEventListener('load', () => {
    if (isOptionPage(window)) {
        return
    }

    chrome.storage.local.get(['settings'], (value) => {
        const settings = value.settings
        if (!settings) {
            return
        }

        const { muteWords, excludeWords, color, tags, urlMatches } = settings as SettingsState
        if (!isTargetSite(window.location, urlMatches.filter(match => match.value))){
            return
        }

        const selector = settings.tags.join(',')

        setColorStyle(muteWords, selector, color)
    })
})

export {}
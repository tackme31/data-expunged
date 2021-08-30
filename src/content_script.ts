import { setColorStyle, isOptionPage, } from './libs'
import type { SettingsState, IUrlMatch } from './store/types'


const isTargetSite = (location: Location, matches: IUrlMatch[]): boolean => {
    const result = matches
        .concat([{ type: 'URL', condition: 'StartsWith', value: '' }]) // Matches all URLs
        .reduce((acc, { type, condition, value }) => {
            const target = type === 'Domain' ? location.hostname : location.href
            switch (condition) {
                case 'Equals': {
                    return {
                        ...acc,
                        include: acc.include || target === value
                    }
                }
                case "StartsWith": {
                    return {
                        ...acc,
                        include: acc.include || target.startsWith(value)
                    }
                }
                case 'NotEqual': {
                    return {
                        ...acc,
                        exclude: acc.exclude && target !== value
                    }
                }
                case "NotStartWith": {
                    return {
                        ...acc,
                        exclude: acc.exclude && !target.startsWith(value)
                    }
                }
                default: {
                    return acc
                }
            }
        }, { exclude: true, include: false })

    return result.exclude && result.include
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
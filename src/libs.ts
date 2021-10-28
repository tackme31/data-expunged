import { ExpungedTags } from './const'

const getInnerText = (node: Element) => Array.from(node.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .reduce((acc, n) => acc += n.nodeValue, '')

const shouldMute = (muteWords: string[], excludeWords: string[], node: Element)	=> {
    var mutes = muteWords.filter(word => getInnerText(node).includes(word))
    var excludes = excludeWords.filter(word => getInnerText(node).includes(word))
    return mutes.length > 0 && excludes.length === 0
}

export const blackout = (muteWords: string[], excludeWords: string[], selector: string) => {
    const targetNodes = document.querySelectorAll(selector)
    Array.from(targetNodes)
        .map((node) => node as HTMLElement)
        .filter((node) => shouldMute(muteWords, excludeWords, node)) 
        .forEach((node) => {
            if (ExpungedTags.includes(node.tagName)) {
                const text = chrome.i18n.getMessage('data_expunged')
                node.outerHTML = `<${node.tagName}><b>[${text}]</b></${node.tagName}>`
                return;
            }

            const black = '█'.repeat(node.innerText.length)
            if (node.tagName === 'A') {
                node.style.color = 'unset'
                node.innerHTML = black
                return;
            }

            node.outerHTML = `<span>${black}</span>`
        }
    )
}

export const isOptionPage = (window: Window) => {
    return window
    && window.location.protocol === 'chrome-extension:'
    && window.location.hostname == chrome.runtime.id
}
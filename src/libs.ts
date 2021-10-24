import { BlockLevelTags } from './const'


const getInnerText = (node: Element) => Array.from(node.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .reduce((acc, n) => acc += n.nodeValue, '')

const shouldMute = (muteWords: string[], excludeWords: string[], node: Element)	=> {
    var mutes = muteWords.filter(word => getInnerText(node).includes(word))
    var excludes = excludeWords.filter(word => getInnerText(node).includes(word))
    return mutes.length > 0 && excludes.length === 0
}

export const setColorStyle = (muteWords: string[], excludeWords: string[], selector: string, color: string) => {
    const targetNodes = document.querySelectorAll(selector)
    Array.from(targetNodes)
        .map((node) => node as HTMLElement)
        .filter((node) => shouldMute(muteWords, excludeWords, node)) 
        .forEach((node) => {
            if (BlockLevelTags.includes(node.tagName)) {
                node.outerHTML = '<span><b>[DATA EXPUNGED]</b></span>'
            } else {
                const blackout = '█'.repeat(node.innerHTML.length)
                node.outerHTML = `<span>${blackout}</span>`
            }
        }
    )
}

export const isOptionPage = (window: Window) => {
    return window
    && window.location.protocol === 'chrome-extension:'
    && window.location.hostname == chrome.runtime.id
}
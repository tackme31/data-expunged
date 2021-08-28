import type { SettingsState } from './store/types'

const getInnerText = (node: Element) => Array.from(node.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .reduce((acc, n) => acc += n.nodeValue, '')

const shouldMute = (words: string[], node: Element)	=> words
    .some(word => getInnerText(node).includes(word))

export const setColorStyle = (words: string[], selector: string, color: string) => {
    const targetNodes = document.querySelectorAll(selector)
    Array.from(targetNodes)
        .map((node) => node as HTMLElement)
        .filter((node) => shouldMute(words, node)) 
        .forEach((node) => {
            node.style.color = color
            node.style.backgroundColor = color
        }
    )
}

export const isOptionPage = (window: Window) => {
    return window
    && window.location.protocol === 'chrome-extension:'
    && window.location.hostname == chrome.runtime.id
}
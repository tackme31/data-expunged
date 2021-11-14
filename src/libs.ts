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
            const newNode = document.createElement(node.tagName)
            newNode.style.fontStyle = 'unset'
            newNode.style.textDecoration = 'none'
            newNode.style.fontWeight = 'unset'
            newNode.style.color = 'unset'
            newNode.setAttribute('href', 'javascript:void(0)')
            newNode.innerHTML = ExpungedTags.includes(node.tagName)
                ? `<b>[${chrome.i18n.getMessage('data_expunged')}]</b>`
                : '█'.repeat(node.innerText.length)

            const parent = node.parentNode
            parent?.insertBefore(newNode, node)
            parent?.removeChild(node)

            newNode.addEventListener('click', () => {
                parent?.insertBefore(node, newNode)
                parent?.removeChild(newNode)
            })
        }
    )
}

export const isOptionPage = (window: Window) => {
    return window
    && window.location.protocol === 'chrome-extension:'
    && window.location.hostname == chrome.runtime.id
}
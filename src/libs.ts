const getInnerText = (node: Element) => Array.from(node.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .reduce((acc, n) => acc += n.nodeValue, '')

const shouldMute = (muteWords: string[], excludeWords: string[], node: Element)	=> {
    var isExcluded = excludeWords.some(word => getInnerText(node).includes(word))
    var isMuted = muteWords.some(word => getInnerText(node).includes(word))
    return !isExcluded && isMuted
}

export const setColorStyle = (muteWords: string[], excludeWords: string[], selector: string, color: string) => {
    const targetNodes = document.querySelectorAll(selector)
    Array.from(targetNodes)
        .map((node) => node as HTMLElement)
        .filter((node) => shouldMute(muteWords, excludeWords, node)) 
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
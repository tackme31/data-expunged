export const UrlType = {
  URL: 'URL',
  Domain: 'Domain'
} as const

export type UrlType = typeof UrlType[keyof typeof UrlType]

export const Condition = {
  Equals: 'Equals',
  NotEqual: 'NotEqual',
  StartsWith: 'StartsWith',
  NotStartWith: 'NotStartWith'
}

export type Condition = typeof Condition[keyof typeof Condition]

export type Site = {
  type: UrlType
  condition: Condition
  value: string
}

export type Options = {
  muteWords: string[],
  excludeWords: string[],
  targetSelector: string,
  targetSites: Site[]
}

export interface MaskedHTMLElement extends HTMLElement {
  unmask: () => void;
}
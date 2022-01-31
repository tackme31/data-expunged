import { useChromeStorageLocal } from 'use-chrome-storage'

export function useChromeStorage<T>(key: string, initialValue: T): [T, (value: T) => void, boolean, string] {
  return useChromeStorageLocal(key, initialValue)
}
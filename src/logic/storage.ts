import { useChromeStorageLocal } from 'use-chrome-storage'
import { Options } from '../types';

export function useChromeStorage<T>(key: string, initialValue: T): [T, (value: T) => void, boolean, string] {
  return useChromeStorageLocal(key, initialValue)
}

export const getOptions = async () => {
  const options = (await browser.storage.local.get([
    "muteWords",
    "excludeWords",
    "targetSelector",
    "targetSites",
  ])) as Options;

  return options || {};
};
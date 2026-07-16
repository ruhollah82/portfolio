import { useLocaleStore } from '@/stores/useLocaleStore'
import en from './en.json'
import fa from './fa.json'

const dictionaries = { en, fa }

export const useT = () => {
  const locale = useLocaleStore((state) => state.locale)

  return (key: string) => {
    // DECISION: Fallback to key name to surface missing translations loudly during dev.
    return (dictionaries[locale] as Record<string, string>)[key] ?? key
  }
}

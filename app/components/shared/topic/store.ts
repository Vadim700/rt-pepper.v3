import { getDictionary } from '@/app/dictionaries';
import { create } from 'zustand';

interface LanguageStore {
  defaultLang: string;
  setLang: (curLang: string) => void;
}

const useLanguageStore = create<LanguageStore>((set) => ({
  defaultLang: 'en',
  setLang: (defaultLang) => set(() => ({ defaultLang })),
}));

export default useLanguageStore;

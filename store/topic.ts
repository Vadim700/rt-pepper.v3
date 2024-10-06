import { create } from 'zustand';
import { getDictionary } from '../app/dictionaries';

interface TopicStore {
  topic: string;
  updatePageTopic: (topic: string) => void;
  resetPageTopic: () => void;
}

export const usePageTopicStore = create<TopicStore>((set) => ({
  topic: 'Main Page',
  updatePageTopic: (topic) => set(() => ({ topic })),
  resetPageTopic: () => set(() => ({ topic: 'Main Page' })),
}));

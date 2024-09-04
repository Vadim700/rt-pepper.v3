import { create } from 'zustand';

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

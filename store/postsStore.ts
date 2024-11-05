import { getAllPosts } from '@/services/postsActions';
import { create } from 'zustand';

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostStore {
  posts: Post[];
  setPosts: () => void;
  deletePost: (id: number) => void;
  createPost: (post: Omit<Post, 'id'>) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: async () => {
    set(await getAllPosts());
  },
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  createPost: (newPost) =>
    set((state) => ({
      posts: [
        {
          ...newPost,
          id: Math.max(0, ...state.posts.map((p) => p.id)) + 1,
        },
        ...state.posts,
      ],
    })),
}));

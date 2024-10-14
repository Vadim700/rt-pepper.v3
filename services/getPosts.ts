export const getAllPosts = async () => {
  const res = await fetch(process.env.NEXTAUTH_URL + '/api/posts');

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const getPostsBySearch = async () => {};

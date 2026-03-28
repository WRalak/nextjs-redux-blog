// lib/mockApi.ts
// Mock API for testing when external API is not accessible

const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js and Redux",
    body: "Learn how to build a modern blog application using Next.js 14 with Redux Saga for state management. This comprehensive guide covers everything from setup to deployment.",
    userId: 1,
    tags: ["nextjs", "redux", "tutorial"],
    reactions: { likes: 42, dislikes: 2 },
    views: 1250,
    image: "https://picsum.photos/seed/nextjs-redux/400/250.jpg",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "TypeScript Best Practices in 2024",
    body: "Discover the latest TypeScript best practices and patterns for building scalable applications. From type safety to advanced generics, master modern TypeScript development.",
    userId: 2,
    tags: ["typescript", "best-practices", "development"],
    reactions: { likes: 38, dislikes: 1 },
    views: 980,
    image: "https://picsum.photos/seed/typescript/400/250.jpg",
    createdAt: "2024-01-20T14:30:00Z"
  },
  {
    id: 3,
    title: "Building Responsive Layouts with Tailwind CSS",
    body: "Explore advanced techniques for creating beautiful, responsive layouts using Tailwind CSS. Learn about utility-first design and modern CSS approaches.",
    userId: 3,
    tags: ["css", "tailwind", "design"],
    reactions: { likes: 56, dislikes: 3 },
    views: 2100,
    image: "https://picsum.photos/seed/tailwind/400/250.jpg",
    createdAt: "2024-01-25T09:15:00Z"
  },
  {
    id: 4,
    title: "React Hooks Deep Dive",
    body: "A comprehensive look at React Hooks and how to use them effectively in your applications. From useState to custom hooks, master the modern React ecosystem.",
    userId: 1,
    tags: ["react", "hooks", "javascript"],
    reactions: { likes: 71, dislikes: 4 },
    views: 3200,
    image: "https://picsum.photos/seed/react-hooks/400/250.jpg",
    createdAt: "2024-02-01T16:45:00Z"
  },
  {
    id: 5,
    title: "Modern State Management Patterns",
    body: "Compare different state management solutions in modern web applications. From Redux to Zustand, find the right solution for your next project.",
    userId: 2,
    tags: ["state-management", "redux", "javascript"],
    reactions: { likes: 29, dislikes: 2 },
    views: 890,
    image: "https://picsum.photos/seed/state-mgmt/400/250.jpg",
    createdAt: "2024-02-05T11:20:00Z"
  }
];

interface PostData {
  title: string
  body: string
  userId: number
  tags?: string[]
}

export const mockApi = {
  getPosts: async (skip = 0, limit = 10) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const posts = mockPosts.slice(skip, skip + limit);
    return {
      data: {
        posts,
        total: mockPosts.length,
        skip,
        limit
      }
    };
  },

  getPostById: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const post = mockPosts.find(p => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    
    return { data: post };
  },

  searchPosts: async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const filteredPosts = mockPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    return {
      data: {
        posts: filteredPosts,
        total: filteredPosts.length,
        skip: 0,
        limit: 10
      }
    };
  },

  createPost: async (postData: PostData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('mockApi.createPost called with:', postData)
    console.log('Current mockPosts:', mockPosts)
    
    const newId = mockPosts.length > 0 ? Math.max(...mockPosts.map(p => p.id)) + 1 : 1
    console.log('Generated new ID:', newId)
    
    const newPost = {
      id: newId,
      ...postData,
      tags: postData.tags || [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      image: `https://picsum.photos/seed/post${newId}/400/250.jpg`,
      createdAt: new Date().toISOString()
    };
    
    console.log('New post created:', newPost)
    mockPosts.unshift(newPost);
    console.log('Updated mockPosts:', mockPosts)
    
    return { data: newPost };
  },

  updatePost: async (id: number, postData: Partial<PostData>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    mockPosts[postIndex] = { ...mockPosts[postIndex], ...postData };
    
    return { data: mockPosts[postIndex] };
  }
};

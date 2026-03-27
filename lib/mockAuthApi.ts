// lib/mockAuthApi.ts
// Mock Auth API for testing when external API is not accessible

export const mockAuthApi = {
  login: async (username: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - accept any credentials for demo
    if (username && password) {
      return {
        data: {
          id: 1,
          username: username,
          email: `${username}@example.com`,
          firstName: username.charAt(0).toUpperCase() + username.slice(1),
          lastName: 'User',
          token: `mock_token_${Date.now()}`,
          image: `https://picsum.photos/seed/${username}/100/100.jpg`
        }
      };
    }
    
    throw new Error('Invalid credentials');
  }
};

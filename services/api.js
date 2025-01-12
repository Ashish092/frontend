const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to fetch all blogs
export const fetchBlogs = async () => {
  try {
    console.log('Fetching blogs from:', `${API_URL}/api/blogs`);
    const response = await fetch(`${API_URL}/api/blogs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

// Function to create a new blog
export const createBlog = async (blogData) => {
  try {
    const response = await fetch(`${API_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}; 
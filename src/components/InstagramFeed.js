import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstagramFeed.css';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      const accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;

      // Check if accessToken is missing or undefined
      if (!accessToken) {
        console.warn('Access token is missing. Using mock data instead.');
        // Use mock data if the access token is not defined
        const mockPosts = Array.from({ length: 9 }, (_, index) => ({
          id: `mock-post-${index + 1}`,
          media_url: `https://via.placeholder.com/300x300.png?text=Mock+Post+${index + 1}`,
          caption: `This is a mock caption for post ${index + 1}`,
        }));
        setPosts(mockPosts);
        return; // Stop execution if accessToken is missing
      }

      const apiUrl = `https://graph.instagram.com/me/media?fields=id,media_url,caption&access_token=${accessToken}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch Instagram posts'); // Handle fetch errors
        const data = await response.json();
        setPosts(data.data.slice(0, 9) || []);
      } catch (error) {
        console.warn('Error fetching Instagram posts, using mock data:', error);
        // Use mock data in case of any fetch error
        const mockPosts = Array.from({ length: 9 }, (_, index) => ({
          id: `mock-post-${index + 1}`,
          media_url: `https://via.placeholder.com/300x300.png?text=Mock+Post+${index + 1}`,
          caption: `This is a mock caption for post ${index + 1}`,
        }));
        setPosts(mockPosts);
      }
    };

    fetchInstagramPosts();
  }, []);

  const handlePostClick = (post) => {
    navigate(`/post/${post.id}`, { state: { post } }); // Pass post data to InstagramNewFeed
  };

  return (
    <div className="instagram-feed">
      {posts.length === 0 ? (
        <p className="loading">Loading Instagram posts...</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div
              className="post-card"
              key={post.id}
              onClick={() => handlePostClick(post)} // Pass the whole post object
            >
              <img
                src={post.media_url}
                alt={post.caption || 'Instagram post'}
                className="post-image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstagramFeed;

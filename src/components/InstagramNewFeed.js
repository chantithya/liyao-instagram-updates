import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './InstagramNewFeed.css';

const InstagramNewFeed = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;

      // If the access token or id is missing, log a warning and return early
      if (!accessToken || !id) {
        console.warn('Access token or post ID is missing. Displaying mock data.');

        // Use mock data as a fallback
        setPost({
          id: 'mock-post',
          media_url: 'https://via.placeholder.com/600x600.png?text=Mock+Post',
          caption: 'This is a mock caption for the post.',
        });
        return;
      }

      const requestUrl = `https://graph.instagram.com/${id}?fields=media_url,caption&access_token=${accessToken}`;

      try {
        const response = await fetch(requestUrl);
        if (!response.ok) throw new Error('Failed to fetch post data.');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Fetching post data failed:', error);
        // Use mock data as a fallback in case of an error
        setPost({
          id: 'mock-post',
          media_url: 'https://via.placeholder.com/600x600.png?text=Mock+Post',
          caption: 'This is a mock caption for the post.',
        });
      }
    };

    fetchPostData();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="instagram-new-feed">
      <img src={post.media_url} alt={`Post ${post.id}`} className="image" />
      <div className="caption">
        <h2>Post {post.id}</h2>
        <p>{post.caption || 'No caption available'}</p>
      </div>
    </div>
  );
};

export default InstagramNewFeed;

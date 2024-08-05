import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';
import PostBox from './PostBox';
import Post from './Post';

function Feed({ username, avatar }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <PostBox username={username} avatar={avatar} onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <Post
          key={post._id}
          username={post.username}
          text={post.text}
          image={post.image}
          avatar={post.avatar}
          likes={post.likes}
          postId={post._id}
        />
      ))}
    </div>
  );
}

export default Feed;

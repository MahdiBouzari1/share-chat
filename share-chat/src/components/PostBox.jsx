import React, { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import './PostBox.css';

function PostBox({ username, avatar, onPostCreated }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username,
      text,
      image,
      avatar,
    };

    try {
      const response = await axios.post('http://localhost:8000/posts', newPost);
      onPostCreated(response.data);
      setText('');
      setImage('');
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <div className="postBox">
      <form onSubmit={handleSubmit}>
        <div className="postBox__input">
          <Avatar src={avatar} />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's Up?"
            type="text"
          />
        </div>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="postBox_imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />
        <Button className="postBox__postButton" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}

export default PostBox;

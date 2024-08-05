import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import './Post.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';

function Post({  username,  text, avatar, image, likes, postId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    try {
      const response = liked
        ? await axios.post(`http://localhost:8000/posts/unlike/${postId}`)
        : await axios.post(`http://localhost:8000/posts/like/${postId}`);
      setLiked(!liked);
      setLikeCount(response.data.likes);
    } catch (error) {
      console.error('Error liking/unliking post', error);
    }
  };

  return (
    <div className="post">
      <div className="post_avatar">
        <Avatar src={avatar} />
      </div>
      <div className="post_body">
        <div className="post_header">
          <div className="post_headerText">
            <h3>
              {username}{' '}
              <span className="post_headerSpecial">
                 @
                {username}
              </span>
            </h3>
          </div>
          <div className="post_headerDescription">
            <p>{text}</p>
          </div>
        </div>
        {image && <img src={image} alt="" />}
        <div className="post_footer">
          {/* <ChatBubbleOutlineIcon fontSize="small" /> */}
          {liked ? (
            <FavoriteIcon fontSize="small" style={{ color: 'red' }} onClick={handleLike} />
          ) : (
            <FavoriteBorderIcon fontSize="small" onClick={handleLike} />
          )}
          <span>{likeCount}</span>
          {/* <PublishIcon fontSize="small" /> */}
        </div>
      </div>
    </div>
  );
}

export default Post;

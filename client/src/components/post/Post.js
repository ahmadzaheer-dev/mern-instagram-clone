import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  SendOutlined,
} from "@material-ui/icons";
import "../../styles/post.css";
import { connect } from "react-redux";
import { likePost } from "../../actions/feed";

const Post = ({ user, imageUrl, caption, id, likePost }) => {
  const handleLikePost = (e) => {
    likePost(id);
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={user.name}
          src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
          variant="circle"
        />

        <Link to={`/${user.username}`} className="post__user">
          {user.username}
        </Link>
      </div>
      <img className="post__image" src={imageUrl} alt="post" />
      <ul className="post__optionbar">
        <li className="post__optionitem">
          <button onClick={(e) => handleLikePost(e)}>
            <FavoriteBorder />
          </button>
        </li>
        <li className="post__optionitem">
          <ChatBubbleOutline />
        </li>
        <li className="post__optionitem">
          <SendOutlined />
        </li>
      </ul>
      <div className="post__caption">
        <Link to="#" className="post__user">
          {user.username}
        </Link>
        <caption className="post__captiontext">{caption}</caption>
      </div>
    </div>
  );
};

export default connect(null, { likePost })(Post);

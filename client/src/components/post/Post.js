import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  SendOutlined,
} from "@material-ui/icons";
import "../../styles/post.css";

const Post = ({ user, imageUrl, caption }) => {
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
          <FavoriteBorder />
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

export default Post;

import { useState } from "react";
import Comments from "./Comments";
import { FavoriteBorder } from "@material-ui/icons";
import { likePost } from "../../actions/feed";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../styles/postmodal.css";

const PostModal = ({ post, likePost }) => {
  const handleLikePost = (e) => {
    console.log("entered function");
    likePost(post._id);
  };

  return (
    <div className="postmodal">
      <div className="postmodal__img-cont">
        <div>
          <img
            className="postmodal__img"
            src={`http://localhost:5000/api/post/image/${post.image}`}
            alt=""
          />
        </div>
      </div>
      <div className="postmodal__details-cont">
        <div className="postmodal__topbar">
          <div className="post__header">
            <Avatar
              className="post__avatar"
              alt={post.user.username}
              src={`http://localhost:5000/api/user/avatar/${post.user.avatar}`}
              variant="circle"
            />

            <Link to={`/${post.user.username}`} className="post__user">
              {post.user.username}
            </Link>
          </div>
        </div>
        <Comments
          classes="vertical-flex"
          comments={post.comments}
          id={post._id}
          isProfilePost={true}
        >
          <ul className="post__optionbar">
            <li className="post__optionitem">
              <button
                className="post__likebtn"
                onClick={(e) => handleLikePost(e)}
              >
                <FavoriteBorder />
              </button>
            </li>
            <li className="post__optionitem">
              <span className="post__likes">{`${post.likes.length} likes`}</span>
            </li>
          </ul>
        </Comments>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.data,
});

export default connect(mapStateToProps, { likePost })(PostModal);

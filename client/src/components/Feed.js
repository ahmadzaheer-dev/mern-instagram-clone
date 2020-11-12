import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Post from "./post/Post";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loadFeed } from "../actions/feed";

const Feed = ({ feed, isAuthenticated, loadFeed }) => {
  useEffect(() => {
    loadFeed();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="row">
        {feed !== 0 &&
          feed.length > 0 &&
          feed.map((post) => {
            return (
              <Post
                user={post.user}
                imageUrl={`http://localhost:5000/api/post/image/${post.postId.image}`}
                caption={post.postId.caption}
                key={post._id}
              />
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  feed: state.feed,
});

export default connect(mapStateToProps, { loadFeed })(Feed);

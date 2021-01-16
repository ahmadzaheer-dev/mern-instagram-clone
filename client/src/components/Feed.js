import React, { useEffect, Fragment } from "react";
import Post from "./post/Post";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadFeed } from "../actions/feed";
import "../styles/feed.css";
import { getCurrentProfile } from "../actions/profile";
import ProfileSnippet from "./Profile/ProfileSnippet";
import Loading from "./loading/Loading";

const Feed = ({ feed, user, loadFeed, profile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
    loadFeed();
  }, [getCurrentProfile, loadFeed]);

  return (
    <div>
      {profile.isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {profile.data ? (
            <div className="row col-2-2-1">
              <div className="col col-60">
                <div className="feed-wrapper">
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
              <div className="col col-40">
                <div className="profile-wrapper">
                  <ProfileSnippet user={user} profile={profile} size="small" />
                </div>
              </div>
            </div>
          ) : (
            <div class="row">
              <ProfileSnippet user={user} profile={profile} size="large" />
              <h3 className="profilemsg">
                Hi there! You don't have a profile. Let's get started.
              </h3>
              <Link className="btn" to="/dashboard/edit">
                Setup Profile
              </Link>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  feed: state.feed,
  user: state.auth.user,
  profile: state.profile,
});

export default connect(mapStateToProps, { loadFeed, getCurrentProfile })(Feed);

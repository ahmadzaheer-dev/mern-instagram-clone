import { Fragment } from "react";
import { connect } from "react-redux";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

const ProfileGallery = ({ posts, user, profile, isLoading }) => {
  return (
    <div className="profile-gallery">
      {!posts ? (
        <Loading />
      ) : posts.length > 0 ? (
        <div className="grid-3-1-1-1">
          {posts.map((post) => (
            <div className="col profile-gallery__post-cont">
              <img
                className="profile-gallery__post"
                alt="post"
                src={`http://localhost:5000/api/post/image/${post.image}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="msg-cont">
          {!isLoading && !user ? (
            <p>The user dont have any posts</p>
          ) : user.username !== profile.user.username ? (
            <p>The user dont have any posts</p>
          ) : (
            <Fragment>
              <p className="msg">
                You dont have any posts. Click the button below to add your
                first post
              </p>
              <Link className="add-post__btn" to="/post/create">
                <AddToPhotosIcon fontSize="inherit" />
              </Link>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.profile.posts,
  user: state.auth.user,
  profile: state.profile.data,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, null)(ProfileGallery);

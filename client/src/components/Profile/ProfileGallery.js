import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import PostModal from "../post/PostModal";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "react-modal";
import { setPost } from "../../actions/post";

const ProfileGallery = ({ posts, user, profile, isLoading, setPost }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = async (post) => {
    if (post) {
      await setPost(post);
      setIsOpen(true);
    }
  };

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
              <a onClick={(e) => openModal(post)}>Open Post</a>
            </div>
          ))}
          <Modal
            className="post-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={{
              overlay: {
                position: "fixed",
                backgroundColor: "rgba(0, 0, 0, 0.70)",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
              },
            }}
          >
            <button className="post-modal__close" onClick={closeModal}>
              <CloseIcon />
            </button>
            <PostModal />
          </Modal>
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

export default connect(mapStateToProps, { setPost })(ProfileGallery);

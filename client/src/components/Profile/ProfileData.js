import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "../../styles/profile.css";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { followProfile } from "../../actions/profile";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  xlarge: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProfileData = ({ profile, user, posts, isLoading, followProfile }) => {
  const classes = useStyles();

  const onFollowClick = (e) => {
    followProfile(profile.user._id);
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFollowingModal, setIsFollowingModal] = useState(false);

  const openModal = async (isFollowing) => {
    if (isFollowing) {
      await setIsFollowingModal(true);
    } else {
      await setIsFollowingModal(false);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="profile-data grid-2-1-2">
        <div className="col">
          <Avatar
            className={`profile-data__avatar ${classes.xlarge}`}
            alt=""
            src={`http://localhost:5000/api/user/avatar/${profile.user.avatar}`}
            variant="circle"
          />
        </div>
        <div className="col">
          <div className="flex profile-data__top-bar">
            <h2 className="profile-data__username">{profile.user.username}</h2>
            {!isLoading ? (
              !user ? (
                <button className="profile-data__btn">Follow</button>
              ) : user.username === profile.user.username ? (
                <Link to="/dashboard/edit" className="profile-data__btn">
                  Edit Profile
                </Link>
              ) : profile.followers.filter((follower) => {
                  return follower.user._id === user._id;
                }).length > 0 ? (
                <button
                  onClick={(e) => onFollowClick(e)}
                  className="profile-data__btn"
                >
                  Followed
                </button>
              ) : (
                <button
                  onClick={(e) => onFollowClick(e)}
                  className="profile-data__btn"
                >
                  Follow
                </button>
              )
            ) : (
              <Loading />
            )}
          </div>
          <div className="flex profile-data__stats-cont">
            <p className="profile-data__stats">
              <span className="profile-data__stats-count">
                {posts && posts.length}
              </span>{" "}
              posts
            </p>
            <p className="profile-data__stats">
              <span className="profile-data__stats-count">
                {profile.followers.length}
              </span>{" "}
              <button
                className="profile-data__btn--transparent"
                onClick={(e) => openModal(false)}
              >
                followers
              </button>
            </p>
            <p className="profile-data__stats">
              <span className="profile-data__stats-count">
                {profile.following.length}
              </span>{" "}
              <button
                className="profile-data__btn--transparent"
                onClick={(e) => openModal(true)}
              >
                following
              </button>
            </p>
          </div>
          <h3 className="profile-data__fullname">{profile.name}</h3>
          <p className="profile-data__bio">{profile.bio}</p>
          <a href="www.ahmadzaheer.com" className="profile-data__website">
            {profile.website}
          </a>
        </div>
        <Modal
          className="follow-modal"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.70)",
            },
          }}
        >
          <div className="follow-modal__topbar">
            {isFollowingModal ? (
              <h3 className="follow-modal__heading">Follwing</h3>
            ) : (
              <h3 className="follow-modal__heading">Followers</h3>
            )}

            <button className="follow-modal__close" onClick={closeModal}>
              <CloseIcon />
            </button>
          </div>
          <div className="follow-modal__users">
            {isFollowingModal
              ? profile.following.map((user) => {
                  return (
                    <div className="search-result__user">
                      <Avatar
                        alt={user.user.username.toUpperCase()}
                        src={`http://localhost:5000/api/user/avatar/${user.user.avatar}`}
                        variant="circle"
                      />
                      <Link
                        className="search-result__username"
                        to={`/${user.user.username}`}
                      >
                        {user.user.username}
                      </Link>
                    </div>
                  );
                })
              : profile.followers.map((user) => {
                  return (
                    <div className="search-result__user">
                      <Avatar
                        alt={user.user.username.toUpperCase()}
                        src={`http://localhost:5000/api/user/avatar/${user.user.avatar}`}
                        variant="circle"
                      />
                      <Link
                        className="search-result__username"
                        to={`/${user.user.username}`}
                      >
                        {user.user.username}
                      </Link>
                    </div>
                  );
                })}
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  posts: state.profile.posts,
});

export default connect(mapStateToProps, { followProfile })(ProfileData);

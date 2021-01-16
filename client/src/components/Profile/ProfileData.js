import { React } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "../../styles/profile.css";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { followProfile } from "../../actions/profile";

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
              followers
            </p>
            <p className="profile-data__stats">
              <span className="profile-data__stats-count">
                {profile.following.length}
              </span>{" "}
              following
            </p>
          </div>
          <h3 className="profile-data__fullname">{profile.name}</h3>
          <p className="profile-data__bio">{profile.bio}</p>
          <a href="www.ahmadzaheer.com" className="profile-data__website">
            {profile.website}
          </a>
        </div>
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

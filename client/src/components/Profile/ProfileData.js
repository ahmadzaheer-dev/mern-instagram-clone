import { React, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import "../../styles/profile.css";

const useStyles = makeStyles((theme) => ({
  xlarge: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProfileData = ({ user, profile, isLoading }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  const classes = useStyles();
  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="profile-data grid-2-1-2">
          <div className="col">
            <Avatar
              className={`profile-data__avatar ${classes.xlarge}`}
              alt=""
              src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
              variant="circle"
            />
          </div>
          <div className="col">
            <div className="flex profile-data__top-bar">
              <h2 className="profile-data__username">{user.username}</h2>
              <button className="profile-data__btn">Edit Profile</button>
              <button className="profile-data__btn">Follow</button>
            </div>
            <div className="flex profile-data__stats-cont">
              <p className="profile-data__stats">
                <span className="profile-data__stats-count">9</span> posts
              </p>
              <p className="profile-data__stats">
                <span className="profile-data__stats-count">161</span> followers
              </p>
              <p className="profile-data__stats">
                <span className="profile-data__stats-count">438</span> following
              </p>
            </div>
            <h3 className="profile-data__fullname">{profile.name}</h3>
            <p className="profile-data__bio">{profile.bio}</p>
            <a href="www.ahmadzaheer.com" className="profile-data__website">
              {profile.website}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.data,
  isLoading: state.profile.isLoading,
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileData);

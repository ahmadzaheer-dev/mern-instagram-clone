import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../../styles/profilesnippet.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  small: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const ProfileSnippet = ({ user, profile, size }) => {
  const classes = useStyles();
  return (
    <div className="profile-snippet">
      <div className="flex">
        <Avatar
          className={`profile-snippet__avatar ${
            size === "small" ? classes.small : classes.large
          } `}
          alt={user.username.toUpperCase()}
          src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
          variant="circle"
        />
        <div className="profile-snippet__data">
          <div className="vertical-middle">
            <Link
              className="profile-snippet__username"
              to={`/${user.username}`}
            >
              {user.username}
            </Link>
            {!profile.isLoading && profile.data && (
              <div>
                <h2 className="profile-snippet__name">{profile.data.name}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSnippet;

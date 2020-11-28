import React from "react";
import ProfileData from "./ProfileData";

const Profile = ({ user, profile, posts }) => {
  return (
    <div className="profile row">
      <ProfileData />
      <div className="divider"></div>
    </div>
  );
};

export default Profile;

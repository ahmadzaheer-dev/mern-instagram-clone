import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Avatar from "@material-ui/core/Avatar";

const EditProfile = ({ profile, createProfile, user, alerts }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const [profileDetails, setProfileDetails] = useState({
    name: !profile.isLoading && profile.data ? profile.data.name : "",
    website: !profile.isLoading && profile.data ? profile.data.website : "",
    bio: !profile.isLoading && profile.data ? profile.data.bio : "",
    phone: !profile.isLoading && profile.data ? profile.data.phone : "",
  });

  const onChange = (e) =>
    setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });

  const { name, website, bio, phone } = profileDetails;

  const onFormSubmit = (e) => {
    e.preventDefault();
    createProfile(name, bio, website, phone);
  };

  return (
    <div className="profile-form-container">
      <form className="profile-form" onSubmit={(e) => onFormSubmit(e)}>
        <div className="flex profile-form__snippet">
          <div className="col-25">
            <Avatar
              className="profile-form__avatar"
              alt={user.username.toUpperCase()}
              src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
              variant="circle"
            />
          </div>

          <div className="col-75">
            <h3 className="profile-form__user">{user.username}</h3>
          </div>
        </div>
        <div className="flex">
          <label className="profile-form__label col-25">Name:</label>
          <input
            className="profile-form__input col-75"
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            placeholder="Name"
          />
        </div>
        <div className="flex">
          <label className="profile-form__label col-25">Bio:</label>
          <input
            className="profile-form__input col-75"
            type="text"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder="Bio"
          />
        </div>
        <div className="flex">
          <label className="profile-form__label col-25">Website:</label>
          <input
            className="profile-form__input col-75"
            type="text"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
            placeholder="Website"
          />
        </div>
        <div className="flex">
          <label className="profile-form__label col-25">Phone:</label>
          <input
            className="profile-form__input col-75"
            type="phone"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
            placeholder="Phone"
          />
        </div>
        <div className="flex">
          <div className="col-25"></div>
          <div className="col-75">
            {alerts !== null &&
              alerts.length > 0 &&
              alerts.map((alert) => (
                <p className={`alert_${alert.alertType}`} key={alert.id}>
                  {alert.msg}
                </p>
              ))}
            <input className="profile-form__btn" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth.user,
  alerts: state.alerts,
});

export default connect(mapStateToProps, { createProfile })(EditProfile);

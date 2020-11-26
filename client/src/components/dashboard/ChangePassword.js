import { React, useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { setAlert } from "../../actions/alert";
import { changePassword } from "../../actions/auth";

const ChangePassword = ({ user, changePassword, setAlert, alerts }) => {
  const [password, setPassword] = useState({
    newPassword: "",
    newPassword2: "",
    oldPassword: "",
  });

  const onChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  const { newPassword, newPassword2, oldPassword } = password;

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      return setAlert("New password do not match", "DANGER");
    }

    changePassword(oldPassword, newPassword);
    setPassword({ newPassword: "", newPassword2: "", oldPassword: "" });
  };

  return (
    <div className="profile-form-container">
      <form className="profile-form" onSubmit={(e) => onFormSubmit(e)}>
        <div className="flex password-form__snippet">
          <div className="col-25">
            <Avatar
              className="password-form__avatar"
              alt={user.username.toUpperCase()}
              src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
              variant="circle"
            />
          </div>

          <div className="col-75">
            <h3 className="password-form__user">{user.username}</h3>
          </div>
        </div>
        <div className="flex">
          <label className="password-form__label col-25">Old Password:</label>
          <input
            className="password-form__input col-75"
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex">
          <label className="password-form__label col-25">New Password:</label>
          <input
            className="password-form__input col-75"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex">
          <label className="password-form__label col-25">
            Confirm Password:
          </label>
          <input
            className="password-form__input col-75"
            type="password"
            name="newPassword2"
            value={newPassword2}
            onChange={(e) => onChange(e)}
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
            <input
              className="password-form__btn"
              type="submit"
              value="Change Password"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  alerts: state.alerts,
});

export default connect(mapStateToProps, { setAlert, changePassword })(
  ChangePassword
);

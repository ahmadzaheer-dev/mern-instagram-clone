import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAvatar } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  xlarge: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

const UploadAvatar = ({ user, alerts, setAvatar }) => {
  const [file, setFile] = useState({ selectedFile: null, loaded: 0 });
  const classes = useStyles();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAvatar(file.selectedFile);
  };

  const onChangeHandler = (e) => {
    setFile({ selectedFile: e.target.files[0], loaded: 0 });
  };

  return (
    <div>
      <Avatar
        className={`upload-avatar__avatar ${classes.xlarge}`}
        alt={user.username.toUpperCase()}
        src={`http://localhost:5000/api/user/avatar/${user.avatar}`}
        variant="circle"
      />
      <div className="upload-avatar__username-cont">
        <Link className="upload-avatar__username" to={`/${user.username}`}>
          {user.username}
        </Link>
      </div>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <p className={`alert_${alert.alertType}`} key={alert.id}>
            {alert.msg}
          </p>
        ))}
      <div className="upload-avatar__form-container">
        <form onSubmit={(e) => handleFormSubmit(e)} className="upload-avatar">
          <input
            class="select-files"
            id="file-upload"
            type="file"
            onChange={onChangeHandler}
          />
          <label
            class="upload-avatar__btn upload-avatar__btn--left"
            for="file-upload"
          >
            Select
          </label>
          <input
            class="upload-avatar__btn"
            type="submit"
            name="submit"
            value="Upload"
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  alerts: state.alerts,
});
export default connect(mapStateToProps, { setAvatar })(UploadAvatar);

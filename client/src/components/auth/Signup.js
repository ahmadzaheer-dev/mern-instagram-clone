import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import "../../styles/auth.css";
import Logo from "../../Images/logo.png";
import { setAlert } from "../../actions/alert";
import "../../styles/alert.css";
import { Link } from "react-router-dom";

const Signup = ({ alerts, register, setAlert }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = userCredentials;

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (password === password2) {
      register(username, email, password);
    } else {
      setAlert(
        "Password do not match. Please make sure the passwords are same.",
        "DANGER"
      );
    }
  };

  const onChange = (e) =>
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });

  return (
    <div>
      <form className="auth-form" onSubmit={(e) => handleFormSubmission(e)}>
        <img className="logo" src={Logo} alt="Logo" />
        <input
          className="auth-form__input"
          type="text"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
          placeholder="Username or email"
        />
        <input
          className="auth-form__input"
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="Username or email"
        />
        <input
          className="auth-form__input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          placeholder="Password"
        />
        <input
          className="auth-form__input"
          type="password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
          placeholder="Confirm Password"
        />
        <input className="auth-form__btn" type="submit" value="Sign Up" />
        {alerts !== null &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <p className={`alert_${alert.alertType}`} key={alert.id}>
              {alert.msg}
            </p>
          ))}
      </form>
      <div className="auth-menu">
        <p>
          Already have an account?{" "}
          <Link className="auth-menu__link" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { register, setAlert })(Signup);

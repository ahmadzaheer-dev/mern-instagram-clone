import { useState } from "react";
import "../../styles/auth.css";
import Logo from "../../Images/logo.png";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleFormSubmission = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const onChange = (e) =>
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form className="auth-form" onSubmit={(e) => handleFormSubmission(e)}>
        <img className="logo" src={Logo} alt="Logo" />
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
        <input className="auth-form__btn" type="submit" value="Log In" />
      </form>
      <div className="auth-menu">
        <p>
          Dont have an account?{" "}
          <Link className="auth-menu__link" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

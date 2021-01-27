import React from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";

const SubMenu = ({ user }) => {
  return (
    <ul className="submenu">
      <li className="submenu__item">
        <Link className="submenu__link" to={`/${user.username}`}>
          <AccountCircleIcon />
          <span>Profile</span>
        </Link>
      </li>
      <li className="submenu__item">
        <Link className="submenu__link" to="/dashboard/edit">
          <SettingsIcon />
          <span>Settings</span>
        </Link>
      </li>
      <li className="submenu__item">
        <Link className="submenu__link" to="/">
          <ExitToAppIcon />
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(SubMenu);

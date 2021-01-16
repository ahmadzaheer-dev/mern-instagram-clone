import React from "react";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import UploadAvatar from "./UploadAvatar";
import { Route, useRouteMatch, Switch, NavLink } from "react-router-dom";
import "../../styles/dashboard.css";
import { connect } from "react-redux";

const Dashboard = ({ isLoading }) => {
  let { url } = useRouteMatch();
  return (
    <div>
      <div className="row flex dashboard">
        <div className="col col-20 dashboard-link-col">
          <NavLink
            to={`${url}/edit`}
            className="dashboard__link"
            activeClassName="dashboard__link--active"
          >
            Edit Profile
          </NavLink>
          <NavLink
            to={`${url}/password/change`}
            className="dashboard__link"
            activeClassName="dashboard__link--active"
          >
            Change Password
          </NavLink>
          <NavLink
            to={`${url}/avatar`}
            className="dashboard__link"
            activeClassName="dashboard__link--active"
          >
            Upload Avatar
          </NavLink>
        </div>
        <div className="col col-80 dashboard-component-col">
          {!isLoading ? (
            <p>Loading</p>
          ) : (
            <Switch>
              <Route path={`/dashboard/edit`}>
                <EditProfile />
              </Route>
              <Route path={`/dashboard/password/change`}>
                <ChangePassword />
              </Route>
              <Route path={`/dashboard/avatar`}>
                <UploadAvatar />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Dashboard);

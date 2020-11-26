import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProtectedRoute);

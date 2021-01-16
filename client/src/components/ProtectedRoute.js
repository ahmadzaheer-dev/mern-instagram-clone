import { React, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading },
  ...rest
}) => {
  if (isLoading) {
    return <Fragment></Fragment>;
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
};

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProtectedRoute);

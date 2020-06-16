import React from "react";
import commonAuth from "../../auths/commonAuth";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (fprops) => {
  const { component: Component, ...rest } = fprops;
  // console.log(fprops);
  // console.log(Component);
  const isAuthenticated = commonAuth(fprops.userInfoAndToken);
  // console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component to={fprops.path} userInfoAndToken={fprops.userInfoAndToken} {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
};

export default ProtectedRoute;
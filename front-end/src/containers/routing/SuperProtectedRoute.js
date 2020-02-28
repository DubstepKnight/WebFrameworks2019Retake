import React from "react";
import teacherAuth from "../../auths/teacherAuth";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (fprops) => {
  const { component: Component, ...rest } = fprops;
  console.log(fprops);
  console.log(Component);
  const isAuthenticated = teacherAuth(fprops.userInfoAndToken);
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component to={fprops.path} {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
};

export default ProtectedRoute;
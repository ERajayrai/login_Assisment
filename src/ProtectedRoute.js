import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ login, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login) return <Component {...props} />;
        if (!login)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = (props) => {
  // console.log(props);
  const { user, component: Comp, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props) => {
        // is there restricted props on the public route (i.e component has a restricted on its props), then verify further
        return rest.restricted ? (
          // if user is already signed in, redirect to dashboard and if not, redirect back to the sign_in page
          user ? (
            <Redirect to="/dashboard" />
          ) : (
            <Comp {...props} user={user} />
          )
        ) : (
          // if not (i.e props.restricted is false), display the route
          <Comp {...props} user={user} />
        );
      }}
    />
  );
};

export default PublicRoutes;

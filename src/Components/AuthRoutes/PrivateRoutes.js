import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = (props) => {
  // console.log(props);
  const { user, component: Comp, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props) => {
        // console.log(props);
        // props here refers to props of react-router-dom
        return user ? (
          <Comp user={user} {...props} />
        ) : (
          <Redirect to="/sign_in" />
        );
      }}
    />
  );
};

export default PrivateRoutes;

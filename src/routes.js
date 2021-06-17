import React from "react";
import Layout from "./HOC/Layout";
import { Switch } from "react-router-dom";

import Home from "./Components/Home";
import SignIn from "./Components/Signin";
import Dashboard from "./Components/Admin/Dashboard";
import AdminMatches from "./Components/Admin/matches";
import AddEditMatch from "./Components/Admin/matches/AddEditMatch";
import AdminPlayers from "./Components/Admin/players";
import AddEditPlayers from "./Components/Admin/players/AddEditPlayers";
import Team from "./Components/Team";
import Matches from "./Components/Matches";
import NotFound from "./Components/NotFound";

import PrivateRoutes from "./Components/AuthRoutes/PrivateRoutes";
import PublicRoutes from "./Components/AuthRoutes/PublicRoutes";

const Routes = (props) => {
  // console.log(props);
  return (
    <Layout>
      <Switch>
        {/* Dashboard is a private route but can be accessed by anyone upon entering the url like below */}
        {/* <Route exact path="/dashboard" component={Dashboard}></Route> */}
        {/* instead, we do below to protect our private route */}
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />

        <PrivateRoutes
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />

        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />

        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match"
          exact
          component={AddEditMatch}
        />

        <PrivateRoutes
          {...props}
          path="/admin_players"
          exact
          component={AdminPlayers}
        />

        <PrivateRoutes
          {...props}
          path="/admin_players/add_player"
          exact
          component={AddEditPlayers}
        />

        <PrivateRoutes
          {...props}
          path="/admin_players/add_players/:id"
          exact
          component={AddEditPlayers}
        />

        {/* if a user is logged in, it shouldn't have access to '/sign_in' again; hence the reason for using restricted as props to help restrict access to '/sign_in' */}
        <PublicRoutes
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />

        <PublicRoutes
          {...props}
          restricted={true}
          path="/sign_in"
          exact
          component={SignIn}
        />

        <PublicRoutes
          {...props}
          restricted={false}
          path="/the_team"
          exact
          component={Team}
        />

        <PublicRoutes
          {...props}
          restricted={false}
          path="/the_matches"
          exact
          component={Matches}
        />

        {/* Public Routes set below are not redone as above */}
        {/* <Route exact path="/sign_in" component={SignIn}>
          <SignIn />
        </Route>

        <Route exact path="/">
          <Home />
        </Route> */}

        <PublicRoutes
          {...props}
          restricted={false}
          path="*"
          component={NotFound}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;

/* 

*/

import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import "./Resources/css/app.css";

import { BrowserRouter as Router } from "react-router-dom";
import { firebase } from "./firebase";

const App = (props) => {
  return (
    <Router>
      <Routes {...props} />
    </Router>
  );
};

// setup authorization for private routes
firebase.auth().onAuthStateChanged((user) => {
  // console.log(user);

  ReactDOM.render(
    <React.StrictMode>
      <App user={user} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

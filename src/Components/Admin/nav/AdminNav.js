import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase";

const linkStyle = {
  color: "#fff",
  fontWeight: "300px",
  borderBottom: "1px solid #353535",
};

const AdminNav = (props) => {
  const links = [
    { title: "Matches", linkTo: "/admin_matches" },
    { title: "Add Match", linkTo: "/admin_matches/edit_match" },
    { title: "Players", linkTo: "/admin_players" },
    { title: "Add Player", linkTo: "/admin_players/add_player" },
  ];

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Logout successfull");
        },
        (error) => {
          console.log("Error logging out");
        }
      );
  };

  const renderItems = () => {
    return links.map((link) => {
      return (
        <Link to={link.linkTo} key={link.title}>
          <ListItem button style={linkStyle}>
            {link.title}
          </ListItem>
        </Link>
      );
    });
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={linkStyle} onClick={() => logoutHandler()}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;

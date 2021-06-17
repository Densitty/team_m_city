import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../HOC/AdminLayout";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";

import { playersCollection } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../utils/miscellanous";

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: [],
  };

  componentDidMount() {
    playersCollection.once("value").then((snapshot) => {
      const players = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        players: reverseArray(players),
      });
    });
  }

  render() {
    // console.log(this.state);
    return (
      <AdminLayout>
        <>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players
                  ? this.state.players.map((player, idx) => {
                      return (
                        <TableRow key={player.id}>
                          <TableCell>
                            <Link
                              to={`/admin_players/add_players/${player.id}`}
                            >
                              {player.name}
                            </Link>
                          </TableCell>

                          <TableCell>
                            <Link
                              to={`/admin_players/add_players/${player.id}`}
                            >
                              {player.lastname}
                            </Link>
                          </TableCell>

                          <TableCell>
                            <Link
                              to={`/admin_players/add_players/${player.id}`}
                            >
                              {player.number}
                            </Link>
                          </TableCell>

                          <TableCell>
                            <Link
                              to={`/admin_players/add_players/${player.id}`}
                            >
                              {player.position}
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </Paper>
        </>

        <div className="admin_progress">
          {this.state.isLoading && (
            <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
          )}
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;

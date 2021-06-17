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

import { matchesCollection } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../utils/miscellanous";

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: [],
  };

  componentDidMount() {
    matchesCollection.once("value").then((snapshot) => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: reverseArray(matches),
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
                {this.state.matches
                  ? this.state.matches.map((match, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell>{match.date}</TableCell>

                          <TableCell>
                            <Link to={`/admin_matches/edit_match/${match.id}`}>
                              {match.away} <strong> - </strong> {match.local}
                            </Link>
                          </TableCell>

                          <TableCell>
                            {match.resultAway} <strong> - </strong>{" "}
                            {match.resultLocal}
                          </TableCell>

                          <TableCell>
                            {match.final === "Yes" ? (
                              <span className="matches_tag_red">Final</span>
                            ) : (
                              <span className="matches_tag_green">
                                Not yet played
                              </span>
                            )}
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

export default AdminMatches;

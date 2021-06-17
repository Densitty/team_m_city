import React, { Component } from "react";
// import CircularProgress from "@material-ui/core/CircularProgress";
import LeagueTable from "./Table";
import MatchList from "./MatchList";

import { matchesCollection } from "../../firebase";
import { firebaseLooper, reverseArray } from "../utils/miscellanous";

export default class Matches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playedFilter: "All", //either this is filterable at once
    resultFilter: "All", //or this is filterable at once
  };

  componentDidMount() {
    matchesCollection.once("value").then((snapshot) => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches),
      });
    });
  }

  showPlayed = (played) => {
    const list = this.state.matches.filter((match) => {
      return match.final === played;
    });

    this.setState({
      filterMatches: played === "All" ? this.state.matches : list,
      playedFilter: played,
      resultFilter: "All",
    });
  };

  showResult = (result) => {
    const list = this.state.matches.filter((match) => {
      return match.result === result;
    });

    this.setState({
      filterMatches: result === "All" ? this.state.matches : list,
      playedFilter: "All",
      resultFilter: result,
    });
  };

  render() {
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show Match</div>
                <div className="cont">
                  <div
                    className={`option ${
                      this.state.playedFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      this.state.playedFilter === "Yes" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("Yes")}
                  >
                    Played
                  </div>
                  <div
                    className={`option ${
                      this.state.playedFilter === "No" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("No")}
                  >
                    Not Played
                  </div>
                </div>
              </div>

              <div className="match_filters_box">
                <div className="tag">Results</div>
                <div className="cont">
                  <div
                    className={`option ${
                      this.state.resultFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      this.state.resultFilter === "W" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("W")}
                  >
                    W
                  </div>
                  <div
                    className={`option ${
                      this.state.resultFilter === "D" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("D")}
                  >
                    D
                  </div>

                  <div
                    className={`option ${
                      this.state.resultFilter === "L" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("L")}
                  >
                    L
                  </div>
                </div>
              </div>
            </div>
            <MatchList matches={this.state.filterMatches} />
          </div>
          <div className="right">
            {/* fake league table */}
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import PlayerCard from "../utils/playerCard";
import Fade from "react-reveal/Fade";

import Stripes from "../../Resources/images/stripes.png";

import { firebase, playersCollection } from "../../firebase";
import { firebaseLooper } from "../utils/miscellanous";
import { Promise } from "core-js";

class Team extends Component {
  state = {
    loading: true,
    players: [],
  };

  componentDidMount() {
    // load the players list from the firebase
    playersCollection.once("value").then((snapshot) => {
      // console.log(snapshot.val());
      const players = firebaseLooper(snapshot);
      // console.log(players);

      let promises = [];

      for (let key in players) {
        // console.log(key); // 20 keys because of 20 players
        const imageRef = new Promise((resolve, reject) => {
          firebase
            .storage()
            .ref("players")
            .child(players[key].image)
            .getDownloadURL()
            .then((url) => {
              // create a new property (url) for each player
              players[key].url = url;
              resolve();
            });
        });

        promises.push(imageRef);
      }

      // wait till all promises are resolved to get the state updated
      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players,
        });
      });
    });
  }

  showPlayersByCategory = (category) => {
    return this.state.players
      ? this.state.players.map((player, index) => {
          return player.position === category ? (
            <Fade left delay={index * 20} key={index}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;
  };

  render() {
    // console.log(this.state.players);
    return (
      <div
        className="the_team_container"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        {!this.state.loading && (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Keeper")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defenders</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Defence")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfielders</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Midfield")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Striker")}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Team;

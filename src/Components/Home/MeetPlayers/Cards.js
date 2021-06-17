import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import Otamendi from "../../../Resources/images/players/Otamendi.png";
import Raheem from "../../../Resources/images/players/Raheem_Sterling_col.png";
import Vincent from "../../../Resources/images/players/Vincent_Kompany_col.png";
import PlayerCard from "../../utils/playerCard";

class Cards extends Component {
  state = {
    cards: [
      {
        bottom: 90,
        left: 300,
        player: Otamendi,
      },
      {
        bottom: 60,
        left: 200,
        player: Raheem,
      },
      {
        bottom: 30,
        left: 100,
        player: Vincent,
      },
      {
        bottom: 0,
        left: 0,
        player: Otamendi,
      },
    ],
  };

  showAnimateCards = () => {
    return this.state.cards.map((card, idx) => {
      // console.log(card);
      return (
        <Animate
          key={idx}
          show={this.props.show}
          start={{ left: 0, bottom: 0 }}
          enter={{
            left: [card.left],
            bottom: [card.bottom],
            timing: { delay: 500, duration: 500, ease: easePolyOut },
          }}
        >
          {({ left, bottom }) => {
            return (
              <div
                style={{
                  position: "absolute",
                  left,
                  bottom,
                }}
              >
                <PlayerCard
                  name="Nicholas"
                  lastname="Otamendi"
                  number="30"
                  bck={card.player}
                />
              </div>
            );
          }}
        </Animate>
      );
    });
  };

  render() {
    return <div>{this.showAnimateCards()}</div>;
  }
}

export default Cards;

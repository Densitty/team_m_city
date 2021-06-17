import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

export default class Stripes extends Component {
  state = {
    stripes: [
      {
        id: 1292751,
        background: "#98c5e9",
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0,
      },
      {
        id: 20392323,
        background: "#ffffff",
        left: 360,
        rotate: 25,
        top: -394,
        delay: 200,
      },
      {
        id: 2018261,
        background: "#98c5e9",
        left: 600,
        rotate: 25,
        top: -498,
        delay: 400,
      },
    ],
  };

  showStripes = () => {
    return (
      <div>
        {this.state.stripes.map((stripe) => {
          return (
            <Animate
              key={stripe.id}
              show={true}
              start={{
                background: "#fff",
                opacity: 0,
                left: 0,
                rotate: 0,
                top: 0,
              }}
              enter={{
                background: `${stripe.background}`,
                opacity: [1],
                left: [stripe.left],
                rotate: [stripe.rotate],
                top: [stripe.top],
                timing: {
                  delay: stripe.delay,
                  duration: 200,
                  ease: easePolyOut,
                },
                events: {
                  end() {
                    // console.log("animation finished");
                  },
                },
              }}
            >
              {({ left, opacity, background, rotate, top }) => {
                return (
                  <div
                    className="stripe"
                    style={{
                      background,
                      opacity,
                      transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`,
                    }}
                  ></div>
                );
              }}
            </Animate>
          );
        })}
      </div>
    );
  };
  render() {
    return <div className="featured_stripes">{this.showStripes()}</div>;
  }
}

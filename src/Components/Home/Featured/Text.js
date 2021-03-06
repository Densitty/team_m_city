import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

import FeaturedPlayer from "../../../Resources/images/featured_player.png";

export default class Text extends Component {
  animateNumber = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          rotate: 0,
        }}
        enter={{
          opacity: [1],
          rotate: [360],
          timing: {
            duration: 1000,
            ease: easePolyOut,
          },
        }}
      >
        {({ opacity, rotate }) => {
          return (
            <div
              className="featured_number"
              style={{
                opacity /* translate(260px, 170px) */,
                transform: `translate(260px, 50px) rotateY(${rotate}deg)`,
              }}
            >
              3
            </div>
          );
        }}
      </Animate>
    );
  };

  animateFirst = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          x: 503, //273
          y: 450, //445
        }}
        enter={{
          opacity: [1],
          x: [273],
          y: [330],

          timing: {
            duration: 500,
            ease: easePolyOut,
          },
        }}
      >
        {({ opacity, x, y }) => {
          return (
            <div
              className="featured_first"
              style={{
                opacity,
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              League
            </div>
          );
        }}
      </Animate>
    );
  };

  animateSecond = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          x: 503, //273
          y: 586, //445
        }}
        enter={{
          opacity: [1],
          x: [273],
          y: [455],

          timing: {
            delay: 300,
            duration: 500,
            ease: easePolyOut,
          },
        }}
      >
        {({ opacity, x, y }) => {
          return (
            <div
              className="featured_second"
              style={{
                opacity,
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              Championships
            </div>
          );
        }}
      </Animate>
    );
  };

  animatePlayer = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
        }}
        enter={{
          opacity: [1],

          timing: {
            delay: 800,
            duration: 500,
            ease: easePolyOut,
          },
        }}
      >
        {({ opacity }) => {
          return (
            <div
              className="featured_player"
              style={{
                opacity,
                background: `url(${FeaturedPlayer})`,
                transform: `translate(550px, 90px)`,
              }}
            ></div>
          );
        }}
      </Animate>
    );
  };

  render() {
    return (
      <div className="featured_text">
        {this.animatePlayer()}
        {this.animateNumber()}
        {this.animateFirst()}
        {this.animateSecond()}
      </div>
    );
  }
}

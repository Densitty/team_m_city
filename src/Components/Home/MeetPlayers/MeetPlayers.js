import React, { Component } from "react";
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../utils/miscellanous";
import Reveal from "react-reveal/Reveal";
import Cards from "./Cards";

export default class MeetPlayers extends Component {
  state = {
    show: false,
  };

  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({ show: true });
        }}
      >
        <div
          className="home_meetplayers"
          style={{ background: `#fff url(${Stripes})` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <Cards show={this.show} />
              </div>
              <div className="home_text_wrapper">
                <>
                  <Tag
                    bck="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      display: "inline-block",
                      marginBottom: "20px",
                    }}
                  >
                    Meet
                  </Tag>
                </>

                <>
                  <Tag
                    bck="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      display: "inline-block",
                      marginBottom: "20px",
                    }}
                  >
                    The
                  </Tag>
                </>

                <>
                  <Tag
                    bck="#0e1731"
                    size="100px"
                    color="#fff"
                    add={{
                      display: "inline-block",
                      marginBottom: "20px",
                    }}
                  >
                    Players
                  </Tag>
                </>

                <>
                  <Tag
                    bck="#fff"
                    size="27px"
                    color="#0e1731"
                    add={{
                      display: "inline-block",
                      marginBottom: "27px",
                      border: "1px solid #0e1731",
                    }}
                    link={true}
                    linkto="/the_team"
                  >
                    See players here
                  </Tag>
                </>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

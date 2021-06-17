import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import { NodeGroup } from "react-move";

export default class MatchList extends Component {
  state = {
    matchesList: [],
  };

  /* any attempt to animate an empty props value can result into an error, hence the approach of getting our props from state value */
  static getDerivedStateFromProps(props, state) {
    return (state = {
      matchesList: props.matches,
    });
  }

  showMatches = () => {
    return (
      this.state.matchesList && (
        <NodeGroup
          data={this.state.matchesList}
          keyAccessor={(data) => data.id}
          start={() => ({
            opacity: 0,
            x: -200,
          })}
          enter={(d, iteration) => ({
            opacity: [1],
            x: [0],
            timing: {
              duration: 500,
              delay: iteration * 50,
              ease: easePolyOut,
            },
          })}
          update={(d, iteration) => ({
            opacity: [1],
            x: [0],
            timing: {
              duration: 500,
              delay: iteration * 50,
              ease: easePolyOut,
            },
          })}
          leave={(d, iteration) => ({
            opacity: [0],
            x: [-200],
            timing: {
              duration: 500,
              delay: iteration * 50,
              ease: easePolyOut,
            },
          })}
        >
          {(nodes) => (
            <div>
              {nodes.map(({ key, data, state: { x, opacity } }) => (
                <div
                  key={key}
                  className="match_box_big"
                  style={{ opacity, transform: `translate(${x}px)` }}
                >
                  <div className="block_wraper">
                    <div className="block">
                      <div
                        className="icon"
                        style={{
                          background: `url(/images/team_icons/${data.localThmb}.png)`,
                        }}
                      ></div>
                      <div className="team">{data.local}</div>
                      <div className="team">{data.resultLocal}</div>
                    </div>

                    <div className="block">
                      <div
                        className="icon"
                        style={{
                          background: `url(/images/team_icons/${data.awayThmb}.png)`,
                        }}
                      ></div>
                      <div className="team">{data.away}</div>
                      <div className="team">{data.resultAway}</div>
                    </div>
                  </div>

                  <div className="block_wraper nfo">
                    <div>
                      <strong>Date: </strong>
                      {data.date}
                    </div>
                    <div>
                      <strong>Stadium: </strong>
                      {data.stadium}
                    </div>
                    <div>
                      <strong>Referee: </strong>
                      {data.referee}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </NodeGroup>
      )
    );
  };

  render() {
    return <div>{this.showMatches()}</div>;
  }
}

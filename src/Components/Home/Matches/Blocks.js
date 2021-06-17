import React from "react";
import { matchesCollection } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../utils/miscellanous";
import MatchesBlock from "../../utils/MatchesBlock";
import Slide from "react-reveal/Slide";

const Blocks = () => {
  const [matches, setMatches] = React.useState([]);

  // make a request to the server [useEffect is used]
  React.useEffect(() => {
    matchesCollection
      .limitToLast(6)
      .once("value")
      .then((snapshot) => {
        // console.log(snapshot.val());
        const matches = firebaseLooper(snapshot);
        // console.log(matches);
        // matches = reverseArray(matches);
        setMatches(reverseArray(matches));
      });
  }, []);

  const showMatches = (matches) => {
    // console.log(matches);
    return matches
      ? matches.map((match) => {
          return (
            <Slide bottom key={match.id}>
              <div className="item">
                <div className="wrapper">
                  <MatchesBlock match={match} />
                </div>
              </div>
            </Slide>
          );
        })
      : null;
  };

  return <div className="home_matches">{showMatches(matches)}</div>;
};

/* using the react-awesome-reveal instead of react-reveal
import { Slide } from "react-awesome-reveal";
const showMatches = (matches) => {
  console.log(matches);
  return matches
    ? matches.map((match) => {
        return (
          <Slide key={match.id} className="item" triggerOnce>
            <div>
              <div className="wrapper">
                <MatchesBlock match={match} />
              </div>
            </div>
          </Slide>
        );
      })
    : null;
};
*/

export default Blocks;

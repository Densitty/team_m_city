import React from "react";
import { Tag } from "../../utils/miscellanous";
import Blocks from "./Blocks";

const MatchesHome = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag bck="#0e1737" size="50px" color="#fff" add={{}}>
          Matches
        </Tag>
        <Blocks />
        <Tag
          bck="#fff"
          size="22px"
          color="#0e1737"
          link={true}
          linkto="/the_team"
        >
          See more matches
        </Tag>
      </div>
    </div>
  );
};

export default MatchesHome;

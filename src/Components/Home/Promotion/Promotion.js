import React from "react";
import PromotionAnimate from "./PromotionAnimate";
import Enroll from "./Enroll";

const Promotion = () => {
  return (
    <div className="promotion_wrapper" style={{ background: "#fff" }}>
      <div className="container">
        <PromotionAnimate />
        <Enroll />
      </div>
    </div>
  );
};

export default Promotion;

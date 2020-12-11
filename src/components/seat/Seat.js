import React from "react";
import "./seat.css";

const Seat = (props) => {
  const resolvedClass = {
    background: "#aa9d9e",
    pointerEvents: "none",
  };
  return (
    <div className="cinema-seats" onClick={props.setTimer}>
      <div
        className={props.className}
        onClick={props.seatStatus(props.seat.id, props.seat)}
        style={props.seat.reserved === true ? resolvedClass : {}}>
        {props.seat.number}
      </div>
    </div>
  );
};
export default Seat;

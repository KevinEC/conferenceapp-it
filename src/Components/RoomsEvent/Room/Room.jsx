import React from "react";
export const Room = props => {
  return (
    <>
      <p className="textStyle borderRight " onClick={props.onClick}>Room {props.number}</p>
    </>
  );
};

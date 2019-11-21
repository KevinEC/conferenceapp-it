import React from "react";
export const Room = props => {
  return (
    <>
      <p onClick={props.onClick}>Room {props.number}</p>
    </>
  );
};

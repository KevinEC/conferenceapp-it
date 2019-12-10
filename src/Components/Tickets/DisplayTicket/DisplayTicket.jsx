import React from "react";

export const DisplayTicket = props => {
  return (
    <>
      <div className="vehicle-card">
        <div className="parking-info">
          <span className="parking-duration">Ticket Nummber</span>
          <span className="ticket-number">{props.state.ticket.id}</span>
        </div>
        <div className="owner-info">
          <span className="building-unit">
            Name: {props.state.ticket.name}
            <br />
            Surname: {props.state.ticket.surname}
          </span>
        </div>
        <div className="vehicle-info">
          <span className="status-text">Email: {props.state.ticket.email}</span>
        </div>
        <div className="status">
          <div className="status-action">i</div>
          <span className="status-text">Event: {props.state.ticket.event}</span>
          <div className="status-action">i</div>
        </div>
      </div>
    </>
  );
};

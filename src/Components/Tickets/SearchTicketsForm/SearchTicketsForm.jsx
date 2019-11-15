import React from "react";

export const SearchTicketsForm = () => {
  return (
    <>
      <form
        className="ui form formSearchTickets"
        method="POST"
        action="/signup"
      >
        <div className="field ">
          <div className="labelTicketsAlign">
            <label className="sTicketLabel" htmlFor="sTicket">
              SEARCH TICKET
            </label>
          </div>

          <input
            type="text"
            id="searchTicketInput"
            name="ticketNumber"
            placeholder="Ex P029SD82SA9DS02S"
          />
        </div>
        <button className="ui  formButtons" type="submit">
          Submit
        </button>
        <button className="ui formButtons" type="reset">
          Reset
        </button>
      </form>
    </>
  );
};

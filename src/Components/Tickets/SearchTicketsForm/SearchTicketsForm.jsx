import React from "react";

export const SearchTicketsForm = (props) => {
let id = "";
  const getInputValue = (e) => {
    id =  e.target.value;

  }

  const passData = (e) => {
     console.log(id);
      props.searchFunc(id);
      e.preventDefault();

  }
  return (
    <>
      <form
        className="ui form formSearchTickets"
        onSubmit={passData}
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
            onChange={getInputValue}
          />
        </div>
        <button className="ui  formButtons"  type="submit">
          Submit
        </button>
        <button className="ui formButtons" type="reset">
          Reset
        </button>
      </form>
    </>
  );
};

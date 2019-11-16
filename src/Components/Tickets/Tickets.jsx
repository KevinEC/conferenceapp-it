import React, { Component } from "react";
import { SearchTicketsForm } from "./SearchTicketsForm/SearchTicketsForm";
import { BuyTicketForm } from "./BuyTicketForm/BuyTicketForm";
import "./Tickets.css";

class Tickets extends Component {
  state = {};

  showModal() {}
  render() {
    return (
      <div className="ui container">
        <div className="ui container grid">
          
          <div className="row">
            <div className="right floated column">
              <BuyTicketForm className="modalButton ui right floated button"></BuyTicketForm>
            </div>
          </div>
          {/*Buy Ticket button finish here*/}

          <div className="row">
            <div className="column">
              <div>
                <SearchTicketsForm></SearchTicketsForm>
              </div>
            </div>
          </div>
          {/*Form search tickets finish here*/}

          <div className="row">
            <div className="sixtheen column"></div>
          </div>
        </div>
        {/**/}
        {/*Ui grid finish here*/}
      </div>
    );
  }
}

export default Tickets;

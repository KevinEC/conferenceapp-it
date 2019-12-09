import React, { Component } from "react";
import { SearchTicketsForm } from "./SearchTicketsForm/SearchTicketsForm";
import { BuyTicketForm } from "./BuyTicketForm/BuyTicketForm.jsx";
import "./Tickets.css";
import "./DisplayTicket/DisplayTicket.css";
import { withFirebase } from "../../Middleware/Firebase";
import { DisplayTicket } from "./DisplayTicket/DisplayTicket";
import { emptyStatement } from "@babel/types";

class Tickets extends Component {
  state = {
    ticket: {
      id: "",
      name: "",
      surname: "",
      event: "",
      email: ""
    },
    eventsName: [],
    buyTicket: {
      name: "",
      surname: "",
      event: "",
      email: "",
      address: ""
    }
  };

  onChangeInputsForm = e => {
    let formValues = this.state.buyTicket;
    let name = e.target.name;
    let value = e.target.value;

    formValues[name] = value;

    this.setState({ formValues });
  };

  createTickets = e => {
    e.preventDefault();
    console.log("Create ticket", this.state.buyTicket.name);
    if (
      this.state.buyTicket.name !== "" &&
      this.state.buyTicket.surname !== "" &&
      this.state.buyTicket.email !== ""
    ) {
      this.props.firebase.db.createTicket(this.state.buyTicket);
    } else {
      alert("Please fill all the fields.");
    }
    document.getElementById("show").style.display = "none";
  };

  getEventsTicket = async id => {
    let idTrim = id.trim();
    if (idTrim == null || idTrim.length !== 20) {
      document.getElementById("searchError").innerHTML =
        "Please enter a valid value of 20 characters!";
    } else {
      document.getElementById("searchError").style.display = "none";
      let data = await this.props.firebase.db.getTicket(idTrim);
      if (data === undefined) {
        alert("Input a valid number");
      } else {
        document.getElementById("show").style.display = "block";
        this.setState({
          ticket: {
            id: idTrim,
            name: data.name,
            surname: data.surname,
            event: data.event,
            email: data.email
          }
        });
      }
    }
  };

  getEventsName = async () => {
    let b = [];
    await this.props.firebase.db.getEventsName().then(doc => {
      doc.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        b.push(doc);
      });

      this.setState({
        eventsName: b
      });
    });
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui container grid">
          <div className="row">
            <div className="right floated column">
              <BuyTicketForm
                eventsName={this.getEventsName}
                state={this.state}
                createTicket={this.createTickets}
                onChange={this.onChangeInputsForm}
                className="modalButton ui right floated button"
              ></BuyTicketForm>
            </div>
          </div>
          {/*Buy Ticket button finish here*/}
          <div className="row">
            <div className="column">
              <div>
                <p id="searchError"></p>
                <SearchTicketsForm
                  searchFunc={this.getEventsTicket}
                ></SearchTicketsForm>
              </div>
            </div>
          </div>
          {/*Form search tickets finish here*/}

          <div className="row">
            <div className="column">
              <div id="show">
                <DisplayTicket state={this.state}></DisplayTicket>
              </div>
            </div>
          </div>
          {/*Display ticket box finish here*/}
        </div>

        {/*Ui grid finish here*/}
      </div>
    );
  }
}

export default withFirebase(Tickets);

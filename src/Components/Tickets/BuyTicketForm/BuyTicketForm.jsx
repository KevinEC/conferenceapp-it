import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

export class BuyTicketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: "",
      showModal: false
    };
    this.props = props;
  }
  handleChangeForms = (e, { value }) => {
    this.setState({ something: value });
  };

  handleCreateButton = evt => {
    evt.preventDefault();
    this.closeModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { something, showModal } = this.state;
    return (
      <Modal
        onClose={this.closeModal}
        open={showModal}
        trigger={
          <Button
            onClick={() => {
              this.props.eventsName();
              this.setState({ showModal: true });
            }}
            className={this.props.className}
          >
            Buy Ticket
          </Button>
        }
        closeIcon
      >
        <Modal.Content>
          <form
            onSubmit={this.props.createTicket}
            className="ui form formBuyTickets"
            id="form"
          >
            <div className="field">
              <div className="fields">
                <div className="field">
                  <input
                    onChange={this.props.onChange}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jack"
                    required
                    minLength="1"
                  />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="field">
                  <input
                    onChange={this.props.onChange}
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder="Kase"
                    required
                  />
                  <label htmlFor="surname">Surname</label>
                </div>
              </div>
            </div>

            <div className="field">
              <input
                onChange={this.props.onChange}
                type="email"
                id="email"
                name="email"
                placeholder="JackKase@gmail.com"
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="field">
              <input
                onChange={this.props.onChange}
                type="text"
                id="address"
                name="address"
                placeholder="3/3 55 Hanover Street London"
                required
              />
              <label htmlFor="email">Address</label>
            </div>

            <div className="field">
              <select
                onChange={this.props.onChange}
                name="event"
                id="events"
                class="ui fluid dropdown"
                required
              >
                <option value=""></option>
                {/* {console.log(this.props.state.eventsName[0])} */}
                {this.props.state.eventsName.map((item, i) => {
                  // console.log("Inside map here ", item.name);
                  return (
                    <option key={i} value={item.name}>
                      {" "}
                      {item.name}{" "}
                    </option>
                  );
                })}
                {/* {this.props.state.eventsName.forEach(element => {
            let a;
            let elementHtml = document.getElementById("events");
            if(elementHtml.childElementCount<2){
              for (a = 0; a < element.length; a++) {
                document.getElementById("events").innerHTML +=  
                  "<option value=" +
                  "'" +
                  element[a] +
                  "'>" +
                  element[a] +
                  "</option>";
              }
            }
            
          })}  */}
              </select>
              <label>Events</label>
            </div>
            <br />

            <div className="buyTicketButton">
              <button
                onClick={evt => {
                  this.handleCreateButton(evt);
                  this.props.createTicket(evt);
                }}
                name="button"
                type="submit"
              >
                Buy Now
              </button>
            </div>
          </form>
        </Modal.Content>
      </Modal>
    );
  }
}

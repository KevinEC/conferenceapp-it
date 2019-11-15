import React from "react";
import {Button, Modal } from "semantic-ui-react";

export const BuyTicketForm = props => (
  <Modal trigger={<Button className={props.className}>Buy Ticket</Button>}>
    <Modal.Content>
  <form className="ui form formBuyTickets" method="POST" action="/signup">
    <div className="field">
      <div className="fields">
        <div className="field">
          <input type="text" id="name" name="name" placeholder="Jack" />
          <label htmlFor="name">Name</label>
        </div>
        
        <div className="field">
          <input type="text" id="surname" name="surname" placeholder="Kase" />
          <label htmlFor="surname">Surname</label>
        </div>
      </div>
    </div>
    <div className="field">
      <input
        type="email"
        id="email"
        name="email"
        placeholder="JackKase@gmail.com"
      />
      <label htmlFor="email">Email</label>
    </div>
    <div className="field">
      <input
        type="text"
        id="address"
        name="address"
        placeholder="3/3 55 Hanover Street London"
      />
      <label htmlFor="email">Address</label>
    </div>

    <div className="field">
      <select class="ui fluid dropdown">
        <option value="">Event</option>
        <option value="1">Cyber</option>
        <option value="2">IT consultant</option>
        <option value="3">JP Morgan</option>
      </select>
      <label>Events</label>
    </div>
    <div className="buyTicketButton">
      <button className=" " type="submit">
        Buy Now
      </button>
    </div>
  </form>
  </Modal.Content>
  </Modal>
);

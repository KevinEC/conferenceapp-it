import React, { Component } from "react";
import { Room } from "./Room/Room";
import { DisplayRoom } from "./DisplayRoom/DisplayRoom";
import "./RoomsEvent.css";

export class RoomsEvent extends Component {
  state = {
    room1: [
      { name: "Max111", age: 28 },
      { name: "Rex1", age: 24 },
      { name: "Jeni1", age: 68 }
    ],
    room2: [
      { name: "Max2", age: 28 },
      { name: "Rex2", age: 24 },
      { name: "Jeni2", age: 68 }
    ],
    room3: [
      { name: "Max3", age: 28 },
      { name: "Rex3", age: 24 },
      { name: "Jeni3", age: 68 }
    ]
  };

  changeRoom = props => {
    this.setState({
      [props.name]: [
        { name: props.event, age: 28 },
        { name: "Rex1", age: 24 },
        { name: "Jeni1", age: 68 }
      ]
    });
  };
  render() {
    return (
      <>
        <div className="ui border container">
          <div className="ui grid middle aligned centered container border">
            <div className="row border2">
              <div className="four wide center aligned column border1">
                <Room
                  number={"1"}
                  onClick={() =>
                    this.changeRoom({
                      name: "room1",
                      event: "Event1"
                    })
                  }
                ></Room>
                <Room
                  number={"2"}
                  onClick={() =>
                    this.changeRoom({
                      name: "room1",
                      event: "Event2"
                    })
                  }
                ></Room>
                <Room
                  number={"3"}
                  onClick={() =>
                    this.changeRoom({
                      name: "room1",
                      event: "Event3"
                    })
                  }
                ></Room>
                
              </div>
              <div className="border2 twelve wide aligned center column">
                <DisplayRoom
                  roomNumber={this.state.room1[0].name}
                ></DisplayRoom>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

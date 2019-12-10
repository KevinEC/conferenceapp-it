import React, { Component } from "react";
import { Room } from "./Room/Room";
import { DisplayRoom } from "./DisplayRoom/DisplayRoom";
import "./RoomsEvent.css";
import { withFirebase } from "../../Middleware/Firebase";

class RoomsEvent extends Component {
  state = { rooms: [] };

  changeRoom = async props => {
    let roomArray = [];
    let results = await this.props.firebase.db.getEventsRoom(props);

    results.get().then(doc => {
      doc.forEach(element => {
        if (element.data().room == "Room 1") {
          roomArray.push(element.data());
        } else if (element.data().room == "Room 2") {
          roomArray.push(element.data());
        } else if (element.data().room == "Room 3") {
          roomArray.push(element.data());
        }
      });
      this.setState({
        rooms: roomArray
      });
    });
  };
  render() {
    return (
      <>
        <div className="ui container">
          <div className="ui grid middle aligned centered container ">
            <div className="row">
              <div className=" six wide center aligned column styleRoomsColumn" >
                
                <Room
                  number={"1"}
                  onClick={() => this.changeRoom("Room 1")}
                ></Room>
                
                <Room
                  number={"2"}
                  onClick={() => this.changeRoom("Room 2")}
                ></Room>
                
                <Room
                  number={"3"}
                  onClick={() => this.changeRoom("Room 3")}
                ></Room>
                
              </div>
              <div className="border2 ten wide center aligned column" >
                <DisplayRoom roomEvents={this.state.rooms}></DisplayRoom>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withFirebase(RoomsEvent);

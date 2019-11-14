import React from "react";

import { withFirebase } from "../Firebase";

import SignOutButton from "./SignOut";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.log = this.log.bind(this);
  }

  async log() {
    const events = await this.props.firebase.db.getAll("events");
    console.log("Events: ", events);
  }

  render() {
    return (
      <div>
        <h1>home Change happen here</h1>
        <button onClick={this.log}>{"console.log"}</button>
        <SignOutButton />
      </div>
    );
  }
}
export default withFirebase(Home);

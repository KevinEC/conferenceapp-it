import React from "react";

import { withFirebase } from "../../Middleware/Firebase";
import { withAuthorization } from "../../Middleware/Session";
  
import SignOutButton from "../SignOut";

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
    const signedIn = this.props.authenticated != null;
    return (
      <div>
        <span>{ signedIn + "" }</span>
        <h1>home Change happen here</h1>
        <button onClick={this.log}>{"console.log"}</button>
        <SignOutButton />
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);
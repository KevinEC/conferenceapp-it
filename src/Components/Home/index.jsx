import React from "react";

import { withFirebase } from "../../Middleware/Firebase";
import { withAuthorization } from "../../Middleware/Session";
  
import Hero from "./Hero.jsx";
import Highlights from "./Highlights.jsx";
import InfoPanels from "./InfoPanels.jsx";


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
        <Hero />
        <Highlights />
        <InfoPanels />
      </div>
    );
  }
}

export default Home;
/*
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);*/
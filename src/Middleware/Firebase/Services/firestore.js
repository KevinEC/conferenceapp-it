class Firestore {
  constructor(db) {
    this.db = db;
  }

  createTicket(props) {
    // Add a new document in collection "cities"
    this.db
      .collection("tickets")
      .add({
        name: props.name,
        surname: props.surname,
        event: props.event,
        email: props.email,
        address: props.address
      })
      .then(function(d) {
        console.log("Document successfully written!", d.id);
        alert(
          "This is your ticket code " +
            "( " +
            d.id +
            " )" +
            ", store it in a safe place and use it inside the search ticket bar to find your ticket.  "
        );
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  async getEventsRoom(props) {
    let eventsName = await this.db.collection("events");
    let query = eventsName.where("room", "==", props).orderBy("time");
    return query;
  }

  async getEventsName() {
    let a = [];
    let eventsName = await this.db
      .collection("events")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          a.push(doc.data());
        });
      });

    return a;
  }

  getTicket(ticket) {
    let ticketSearch = this.db
      .collection("tickets")
      .doc(ticket)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    return ticketSearch;
  }

  async getAll(documentName) {
    let result = [];

    let connection = this.db.collection(documentName);
    let data = await connection.get();

    for (const doc of data.docs) {
      result.push({
        id: doc.id,
        data: doc.data()
      });
    }
    return result;
  }
}

export default Firestore;

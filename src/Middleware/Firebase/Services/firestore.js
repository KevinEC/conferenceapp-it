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

  async getDocument(documentName, id) {
    let connection = await this.db.collection(documentName).doc(id);
    let docReference = await connection.get();
    let data = docReference.data();
    
    return data;
  }

  async onCollectionChange(collectionRef) {
    let observer = await collectionRef.onSnapshot((querySnapshot) => {
      let newQuestions = [];
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New document: ', change.doc.data());
          newQuestions.push(change.doc.data());
        }
      });
      return { newQuestions: newQuestions, unsub: observer };
    });
  }

  /* KEYNOTES */

  /*
  * returns a keynote by id with all headings.
  * All headings are paired up with a reference 
  * to their assosciated questions collection
  */
  async getKeynote(id) {
    let headings = [];

    let connection = await this.db.collection('keys').doc(id);
    let docReference = await connection.get();

    let keynoteData = docReference.data();
    let headingsData = await connection.collection('headings').orderBy("order", "asc").get();

    headingsData.forEach((headingRef) => {
      let heading = headingRef.data();
      let questionsRef = headingRef.ref.collection('questions');

      headings.push({heading: heading, questions: questionsRef});
    });

    return {headings: headings, keynoteData: keynoteData};
  }

  async fetchQuestions(collectionRef) {
    let questions = [];
    let questionsData = await collectionRef.get();

    questionsData.forEach((questionRef) => {
      questions.push(questionRef.data());
    });
    return questions;
  }

  async addQuestion(questionsRef, newData) {
    await questionsRef.add(newData);
  }
}

export default Firestore;

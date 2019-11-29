import "firebase/firestore";

class Firestore {
	constructor(db){
		this.db = db;
	}

	async getAll(documentName) {
    let result = [];

    let connection = this.db.collection(documentName);
    let data = await connection.get();
    
    for(const doc of data.docs) {
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
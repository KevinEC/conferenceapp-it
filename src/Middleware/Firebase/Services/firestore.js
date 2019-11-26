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

  async onDocumentChange(documentName, id) {
    let doc = await this.db.collection(documentName).doc(id);
    let observer = doc.onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New city: ', change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('Modified city: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data());
        }
      });
    });
  }

  async addQuestion(id, newData) {
    let doc = await this.db.collection("keynotes").doc(id);
    doc.update()

  }
}

export default Firestore;
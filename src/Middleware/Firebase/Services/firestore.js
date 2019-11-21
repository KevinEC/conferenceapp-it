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

}

export default Firestore;
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

}

export default Firestore;
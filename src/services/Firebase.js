import { firestore } from "../firebase";


export const addArticle = (datas) => {

    firestore.collection('articles').add({
        'timestamp': datas.timestamp,
        'city': datas.city,
        'picture': datas.picture,
        'text': datas.text,
        'disposition': datas.disposition
    });
};

export const getAllArticles = () => {

    const result = [];
    let query = firestore.collection('articles').orderBy("timestamp", "desc"); // .orderBy("timestamp, desc")
    query.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                result.push({id: doc.id, ...doc.data()});
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    return result;
};

export const getBirth = () => {

    const result = [];
    let query = firestore.collection('birth'); // .orderBy("timestamp, desc")
    query.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                result.push({id: doc.id, ...doc.data()});
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    return result;
};
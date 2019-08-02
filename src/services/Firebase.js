import { firestore } from "../firebase";


export const addArticle = async (datas) => {

    return await firestore.collection('articles').doc(datas.id + '-' + datas.title).set({
        'timestamp': datas.timestamp,
        'city': datas.city,
        'picture': datas.picture,
        'text': datas.text,
        'disposition': datas.disposition
    });
};

export const fbEditArticle = async (datas) => {

    return await firestore.collection('articles').doc(datas.id).set({
        'timestamp': datas.timestamp,
        'city': datas.city,
        'picture': datas.picture,
        'text': datas.text,
        'disposition': datas.disposition
    });
};

export const deleteArticle = async (id) => {

    return await firestore.collection('articles').doc(id).delete();
};

export const getAllArticles = async () => {

    const result = [];
    let query = firestore.collection('articles').orderBy("timestamp", "desc"); // .orderBy("timestamp, desc")
    await query.get()
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


export const fbGetBirth = async () => {

    const result = [];
    let query = firestore.collection('birth'); // .orderBy("timestamp, desc")
    await query.get()
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

export const fbEditBirth = (datas) => {

    firestore.collection('birth').doc('first').set({
        'city': datas.city,
        'name': datas.name,
        'size': datas.size,
        'text': datas.text,
        'timestamp': datas.timestamp,
        'weight': datas.weight
    });
};
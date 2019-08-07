import { firebase, firestore } from "../firebase";
import { COLLECTION_NAME } from "../env";


export const addArticle = (datas) => new Promise((resolve, reject) => {

    firestore.collection(COLLECTION_NAME).doc(datas.id + '-' + datas.title).set({
        'timestamp': datas.timestamp,
        'city': datas.city,
        'filename': datas.filename,
        'text': datas.text,
        'disposition': datas.disposition
    }).then(() => resolve(true)).catch((error) => reject(error));
});

export const addPicture = (file, filename) => new Promise((resolve, reject) => {

    let storageRef = firebase.storage().ref(filename);
    storageRef.putString(file, 'data_url').then(() => resolve(true)).catch((error) => reject(error));
});

export const fbgetPicture = (filename) => new Promise((resolve, reject) => {

    const image = firebase.storage().ref().child(filename);
    const urlPromise = image.getDownloadURL();
    let result;
    urlPromise.then((url) => {
        result = url;
        resolve(url);
    }).catch((error) => reject(error));
});

export const fbEditArticle = async (datas) => {

    return await firestore.collection(COLLECTION_NAME).doc(datas.id).set({
        'timestamp': datas.timestamp,
        'city': datas.city,
        'filename': datas.filename,
        'text': datas.text,
        'disposition': datas.disposition
    });
};

export const deleteArticle = async (id) => {

    return await firestore.collection(COLLECTION_NAME).doc(id).delete();
};

export const getAllArticles = async () => {

    const result = [];
    let query = firestore.collection(COLLECTION_NAME).orderBy("timestamp", "desc"); // .orderBy("timestamp, desc")
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
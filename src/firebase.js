import * as firebase from 'firebase';
import {API_KEY, APP_ID, AUTH_DOMAIN, DATABASE_URL, MESSAGING_SENDER_ID, PROJECT_ID} from "./env";

firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: "",
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
});

const firestore = firebase.firestore();

export { firebase, firestore }
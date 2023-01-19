import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
import "firebase/messaging";
import "firebase/storage"

const firebaseConfig = {
	// "type": "service_account",
 //  "project_id": "test-chat-8b138",
 //  "private_key_id": "4889c55ed5942c759a41c0cbfebeaf120f3ee902",
 //  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCS/8xh7XwM90Lo\nleNR/V8KfAZSXDXsR7b+RjvOJHe6meHji53FxQUhoVaTMQk32tJwSpayKzDgp7V0\nI9iGfFtRQQ1XASCrLIlz9CuacuxMNzrXssfVkAepsX+D26OIjPOg5j6ce7CLzEXW\nM5nkY/uZvOONcnW6PPEcYj7LL9BOigCVlZSUBjVjdoaVYnbAfbQOtKRp0VQx0mPK\niS0NGmbbpwjkl1BtHV4CO1FcbLRabKzqfpPwsu8XHlRS1ufJi2jc+Ev1lUbGyi5X\nqdgU6N7emvAzr9EgrEDuRoWZlIlULsI+GX4yB/HWGRSdgHc9YigO3QkAbABdFIMT\nGw1qolIVAgMBAAECggEABwBjCjkHAxEV4UEeYi3YxIWSwYJ92QKzbxoGSDPJdhxV\nO4LPYXeYXnkyR/F6eGwWQN30nojbG6AxTtZUPleW++BG0+GMXkrRQzIaj5EwuxKY\nXWS5Cu2Ax+7Z3XxtJhhclEnTKp3jk00H+INdrZirh6+NARQ2EkhLzafKSOA+ojby\n+mePYRtwA0q4dZ2UQdlujlczzFPJFy0GjVHMdq+rgsulkyqw0VzB34p24EWR94uB\nVQMRaa+QknN46Og9+76BRoHKkcaN/4MW437aw+IGlEuoP39KKxuWWeJJVmvHexuH\nbXl0ooqkO8bBDe+x9hqU0iLQmnSzCKlnG+3DgqPNkwKBgQDPBuvYHOoAuq6s2zqv\nGXWADIGjNM9YKogPrya6r5XzAwvwU7GyzMcVu6tfILjiSFxKvze0jf5Vo1o4wHFE\nsvaTt3QFlLc+yXLUNX5tycbpTFNGDqx6pJ44xETP2X2IG7IxKPYYU7ZvV1PuUHzj\nHv/cBjfdiv0z1/udLyQ8DKxlowKBgQC1xbsZc/e92KgM4AAtuNqnQP/G5OqTq+ts\nES+y/evvcNkRCUTAMKF3xuyV3lYaO0b48klrz199sJ191PpqYM2VTKGBgOH8gKKQ\nqhWUJBy2rtd4Bc3vPXVzxBh9uCAIu+jmyOB3n819NlBL7bybEK869R2ApZcGzPxg\nbhUgT7S05wKBgDzsVn80kxA/36NyqGRa458ZDxVONy5E5eFns8gAX+oxnVPN7V8m\nr/ePULEf2giNLsu4VdZGavAcsDI/P5Xt7G4v8G6sAvjxI1+blmcMmAKTuXXGX69/\nvigKag2YfT6Ol/OrkDA8glVlp4dcHERiHP1Mvyfs/PJCvwLUmp8pQ5ptAoGBALBR\nzAqFjhOuXFyY0DOJszc3+qOgm9aAlk1uYll6q2jIixZWakUPJyE7aXR6hgTN6StE\nQmn8bsFKF4rek8WqfuDKw4MOVKeM06QGCAZ5/QxLjyCSaM8fS5Xu6l7QwuoV9HYg\n9nOzJC3ICJ2OTzwPNBq5d1O5zETBhDG5tm5wQnaTAoGBALKsPoJvkS9xPwt5Iyns\nxb7o17yZKr9Hp1O6yfPdkschaI5YHggfH1SCLC1Q7NRCgYv3kuP4GiZNjjaaDUvQ\nkQk4aYr6lVj1iQOKxveZMAeegHDS0CaAoYgT2e0S4M9EIfgG/NXq0dSldPslFKk1\n5tT8WylHrn5lwLERcri2liVs\n-----END PRIVATE KEY-----\n",
 //  "client_email": "firebase-adminsdk-nq0gc@test-chat-8b138.iam.gserviceaccount.com",
 //  "client_id": "110118513016178335052",
 //  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
 //  "token_uri": "https://oauth2.googleapis.com/token",
 //  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
 //  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nq0gc%40test-chat-8b138.iam.gserviceaccount.com"
  apiKey: "AIzaSyCjgygvheLuDpfC_s6Fbsj3A2erhgxVWPs",
  authDomain: "test-chat-8b138.firebaseapp.com",
  databaseURL: "https://test-chat-8b138-default-rtdb.firebaseio.com",
  projectId: "test-chat-8b138",
  storageBucket: "test-chat-8b138.appspot.com",
  messagingSenderId: "499489368145",
  appId: "1:499489368145:web:14bfea4c72d71966bab070",
  measurementId: "G-EDZEEJ5J9J"
};/*use your own configuration*/

const firebaseApp = firebase.initializeApp(firebaseConfig);
/*you can enable persistence to allow the user to see previous data when he's offline but it will make your queries very slow which leads
to bad user experience so I suggest you implement your own offline support by caching the data and retrieving them when the user is offline*/
//firebaseApp.firestore().enablePersistence();
const db = firebaseApp.firestore();
const db2 = firebaseApp.database();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const createTimestamp2 = firebase.database.ServerValue.TIMESTAMP;
const messaging = "serviceWorker" in navigator && "PushManager" in window ?  firebase.messaging() : null;
const fieldIncrement = firebase.firestore.FieldValue.increment;
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const storage = firebase.storage().ref("images");
const audioStorage = firebase.storage().ref("audios");

//db.disableNetwork();
// loadFirebase,
export { auth , provider, createTimestamp, messaging, fieldIncrement, arrayUnion, storage, audioStorage, db2, createTimestamp2};
export default db;

import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBfi20dEtHJjcfHLt-N0E5KJctfw0oTWN0",
  authDomain: "varkala-map-1512622053521.firebaseapp.com",
  databaseURL: "https://varkala-map-1512622053521.firebaseio.com",
  projectId: "varkala-map-1512622053521",
  storageBucket: "varkala-map-1512622053521.appspot.com",
  messagingSenderId: "25106932395"
}
firebase.initializeApp(config)
export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
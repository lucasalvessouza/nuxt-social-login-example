import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDf1AavhjUDyRWHdv8WZFyV3ijhuhuSRFs',
  authDomain: 'mail-sig-manager.firebaseapp.com',
  databaseURL: 'https://mail-sig-manager.firebaseio.com',
  projectId: 'mail-sig-manager',
  storageBucket: 'mail-sig-manager.appspot.com',
  messagingSenderId: '787832476610',
  appId: '1:787832476610:web:30f6be47e90ddf19917c5b'
}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export const db = app.database()

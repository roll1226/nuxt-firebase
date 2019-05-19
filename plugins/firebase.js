import firebase from 'firebase'

if (!firebase.apps.length) {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: process.env.NUXT_ENV_APIKEY,
    authDomain: process.env.NUXT_ENV_AUTHDOMAIN,
    databaseURL: process.env.NUXT_ENV_DATABASEURL,
    projectId: process.env.NUXT_ENV_PROJECTID,
    storageBucket: process.env.NUXT_ENV_STORAGEBUCKET,
    messagingSenderId: process.env.NUXT_ENV_MESSAGINGSENDERID,
    appId: process.env.NUXT_ENV_APPID
  };
  firebase.initializeApp(firebaseConfig);
}

export default firebase

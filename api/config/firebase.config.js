const {initializeApp} = require('firebase/app');
const {getStorage} = require('firebase/storage');
const {getAuth} = require('firebase/auth');
const dotenv = require('dotenv');
require('firebase/storage');
dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyCwXuq0rUa-y53sUcrxnkQ8TBYcoACTruk",
  authDomain: "combinet-2606.firebaseapp.com",
  projectId: "combinet-2606",
  storageBucket: "combinet-2606.appspot.com",
  messagingSenderId: "886276638418",
  appId: "1:886276638418:web:b40c26d426873d73d1cf0b",
  measurementId: "G-S3JZ5VRS6X"
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const auth = getAuth(firebaseApp);

module.exports = {storage , auth};


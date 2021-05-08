import Compressor from 'compressorjs';
import firebase from 'firebase';
import { ADAddCategory } from '../components/AdAddCategory';
import { AdsubCategory } from '../components/ADsubCategory';
import { SetProduct } from '../components/AdSetProduct';

export var firebaseConfig = {
  apiKey: 'AIzaSyAgZwsJMDkQVJHPpiuahohtNLtpyRMpBKc',
  authDomain: 'augmented-clock-310203.firebaseapp.com',
  projectId: 'augmented-clock-310203',
  storageBucket: 'augmented-clock-310203.appspot.com',
  messagingSenderId: '335468813630',
  appId: '1:335468813630:web:bdb0cb6ed55c4081bb206f',
  measurementId: 'G-V8W5LF6E6T',
};
export const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: false });

ADAddCategory.categoryList();

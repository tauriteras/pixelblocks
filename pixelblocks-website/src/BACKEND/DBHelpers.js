import { initializeApp } from "firebase/app";
import { getDatabase, onValue, set, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBGDqWTiw63RxFMhEqh_V-T9jy6sP8I9Vw",
    authDomain: "pixelblocks-f6da1.firebaseapp.com",
    projectId: "pixelblocks-f6da1",
    storageBucket: "pixelblocks-f6da1.appspot.com",
    messagingSenderId: "1073996073097",
    appId: "1:1073996073097:web:eaecb7e2be5591d21c1e58",
    measurementId: "G-8RQM98XEPE",
  databaseUrl: "https://pixelblocks-f6da1-default-rtdb.firebaseio.com/",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export function testWrite() {
    set(ref(database, 'users/TEST'), {
        name: "Test"
    })
}

export function testRead() {

    let data

    onValue(ref(database, 'users/TEST/name'), (snapshot) => {

        console.log('Fetching data..', snapshot.val())

        data = snapshot.val()

    })

    return data

}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD620owRaviNk7fSVONhTkC3AWezg4JlFg",
  authDomain: "project-covid-19-da8a3.firebaseapp.com",
  databaseURL: "https://project-covid-19-da8a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-covid-19-da8a3",
  storageBucket: "project-covid-19-da8a3.appspot.com",
  messagingSenderId: "796796892513",
  appId: "1:796796892513:web:17d56faa94718a69cdc120",
  measurementId: "G-LJH92X3L1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, get, set, child, update, remove }
from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const db = getDatabase();

const dbref = ref(db);

const table = document.getElementById('myTable2');

get(child(dbref, "Records/"))
.then((snapshot)=>{
  if(snapshot.exists()){
    const objs = snapshot.val();

    for (const key in objs) {
      if (objs.hasOwnProperty(key)) {
        //console.log(objs[key].email);
        const newRow = table.tBodies[0].insertRow();
        newRow.style.height = "50px";

        const cell1 = newRow.insertCell(0);
        cell1.textContent = objs[key].age;
        cell1.classList.add('center-cell');
        cell1.classList.add('item-cell');

        const cell2 = newRow.insertCell(1);
        cell2.textContent = objs[key].gender;
        cell2.classList.add('center-cell');
        cell2.classList.add('item-cell');

        const cell3 = newRow.insertCell(2);
        cell3.textContent = objs[key].fullyVac;
        cell3.classList.add('center-cell');
        cell3.classList.add('item-cell');

        const cell4 = newRow.insertCell(3);
        cell4.textContent = objs[key].vaccineType;
        cell4.classList.add('center-cell');
        cell4.classList.add('item-cell');

        const cell5 = newRow.insertCell(4);
        cell5.textContent = objs[key].booster;
        cell5.classList.add('center-cell');
        cell5.classList.add('item-cell');

        const cell6 = newRow.insertCell(5);
        cell6.textContent = objs[key].boosterType;
        cell6.classList.add('center-cell');
        cell6.classList.add('item-cell');

        const cell7 = newRow.insertCell(6);
        cell7.textContent = objs[key].sideEffects;
        cell7.classList.add('center-cell');
        cell7.classList.add('item-cell');
        cell7.setAttribute('id', 'effects');

        const cell8 = newRow.insertCell(7);
        cell8.textContent = objs[key].infection;
        cell8.classList.add('center-cell');
        cell8.classList.add('item-cell');
        cell8.setAttribute('id', 'infect');
      }
    }
  } else {
    //document.querySelector('.tbody').innerHTML = `<div class='alert alert-danger'><em>No records were found.</em></div>`;
    //alert("No data found");
    document.querySelector('.js-no-record').style.visibility = 'visible';
  }
})
.catch((error)=>{
  alert(error)
})
  

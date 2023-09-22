console.log("09.15.23");

// Firebase
// https://console.firebase.google.com/u/0/project/project-covid-19-da8a3/database/project-covid-19-da8a3-default-rtdb/data

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

// End of Database --------------------------------------------------------------------------------- 

let emailTxtBx= document.querySelector("#emailTxtBx");
let nameTxtBx = document.querySelector("#nameTxtBx");
let ageTxtBx = document.querySelector("#ageTxtBx");
let genderTxtBx = document.querySelector("#genderTxtBx");
let fullyVacTxtBx = document.querySelector("#fullyVacTxtBx");
let vaccineTypeTxtBx = document.querySelector("#vaccineTypeTxtBx");
let boosterTxtBx = document.querySelector("#boosterTxtBx");
let boosterTypeTxtBx = document.querySelector("#boosterTypeTxtBx");
let sideEffectsTxtBx = document.querySelector("#sideEffectsTxtBx");
let infectionTxtBx = document.querySelector("#infectionTxtBx");

let saveBtn = document.querySelector("#saveBtn");

const dbref = ref(db);
function validateData() {
  let checker = false;
  let counter = 1;
  
  get(child(dbref, "Records/"))
    .then((snapshot)=>{
      if(snapshot.exists()){
        const objs = snapshot.val();
        for (const key in objs) {
          if (objs.hasOwnProperty(key)) {
            if(objs[key].email === emailTxtBx.value){
              alert("User Already Exists!")
              checker = false
              break;
            } else {
              checker = true;
              console.log(objs[key].email);
            }
          } 
          counter++;
        }
        if(fieldsChecker().checker){
          if(checker){ 
            saveData(counter, snapshot); 
          }
        } else { 
          alert("Please fill up all required fields." + fieldsChecker().missing); 
        }
      } else {
        saveData(counter, snapshot);
      }
    })
    .catch((error) => {
      alert(error)
    })
}

saveBtn.addEventListener('click', validateData);

function saveData(counter, snapshot){
  set(ref(db, "Records/" + counter), {
    id: counter,
    email: emailTxtBx.value,
    name: nameTxtBx.value,
    age: ageTxtBx.value,
    gender: genderTxtBx.value,
    fullyVac: fullyVacTxtBx.value,
    vaccineType: vaccineTypeTxtBx.value,
    booster: boosterTxtBx.value,
    boosterType: boosterTypeTxtBx.value,
    sideEffects: sideEffectsTxtBx.value,
    infection: infectionTxtBx.value
  })
    .then(() => {
      if(snapshot.exists()) {
        alert("Data added successfully");
      } else {
        alert("First data added successfully");
      }
    })
    .catch((error) => {
      alert(error);
    });

}

function fieldsChecker() {
  let checker = true;
  let missing = [];

  if(emailTxtBx.value === ''){
    emailTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Email");
  } else {
    emailTxtBx.classList.remove("is-invalid");
  }

  if(nameTxtBx.value === ''){
    nameTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Name");
  } else {
    nameTxtBx.classList.remove("is-invalid");
  }

  if(ageTxtBx.value === ''){
    ageTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Age");
  } else {
    ageTxtBx.classList.remove("is-invalid");
  }
  if(genderTxtBx.value === ''){
    genderTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Gender");
  } else {
    genderTxtBx.classList.remove("is-invalid");
  }

  if(vaccineTypeTxtBx.value === ''){
    vaccineTypeTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Vaccine Type");
  } else {
    vaccineTypeTxtBx.classList.remove("is-invalid");
  }


  if(boosterTxtBx.value === ''){
    boosterTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Booster");
  } else {
    boosterTxtBx.classList.remove("is-invalid");
  }

  if(boosterTxtBx.value === 'Yes'){
    if(boosterTypeTxtBx.value === ''){
      boosterTypeTxtBx.classList.add("is-invalid");
      checker = false;
      document.querySelector('.asteriskBT').style.visibility = "visible";
      missing.push(" Booster Type");
    } else {
      boosterTypeTxtBx.classList.remove("is-invalid");
      document.querySelector('.asteriskBT').style.visibility = "hidden";
    }
  } else {
    boosterTypeTxtBx.classList.remove("is-invalid");
    document.querySelector('.asteriskBT').style.visibility = "hidden";
  }

  return {
    'missing': missing,
    'checker': checker
  };
}

/* 

validate email

*/
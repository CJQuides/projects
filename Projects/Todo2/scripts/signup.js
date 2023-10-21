console.log("10.09.23");

// Firebase
// https://console.firebase.google.com/u/0/project/todolist-65707/database/todolist-65707-default-rtdb/data

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfHhdhBx0mz0qNCHLnALnc7h6n-HmY65c",
  authDomain: "todolist-65707.firebaseapp.com",
  databaseURL: "https://todolist-65707-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-65707",
  storageBucket: "todolist-65707.appspot.com",
  messagingSenderId: "99901023216",
  appId: "1:99901023216:web:eaf23685866fda04963335",
  measurementId: "G-Z72Y4KG65W"
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
let passwordTxtBx = document.querySelector("#passwordTxtBx");

let saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener('click', validateData);

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
          // alert("Please fill up all required fields." + fieldsChecker().missing); 
        }
      } else {
        saveData(counter, snapshot);
      }
    })
    .catch((error) => {
      alert(error)
    })
}

function saveData(counter, snapshot){
  set(ref(db, "Records/" + counter), {
    id: counter,
    email: emailTxtBx.value,
    name: nameTxtBx.value,
    password: passwordTxtBx.value
  })
    .then(() => {
      if(snapshot.exists()) {
        alert("Data added successfully");
      } else {
        alert("First data added successfully");
      }      
      localStorage.setItem("userId",counter);
      localStorage.setItem("userName",nameTxtBx.value);
      location.href="./todo.html";
    })
    .catch((error) => {
      alert(error);
    });
}

function fieldsChecker() {
  let checker = true;
  let missing = [];
  let passwordSymbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.]/;
  let passwordNumbers = /[0-9]/;
  let passwordSmall = /[a-z]/;
  let passwordCapital = /[A-Z]/;
  let emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
  
  if(emailTxtBx.value === ''){
    emailTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Email");
  } else if (!emailCheck.test(emailTxtBx.value)){
    document.querySelector(".invalid-feedback1").innerHTML = "This is not a valid email";
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

  if(passwordTxtBx.value === ''){
    passwordTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Password");
  } else if(passwordTxtBx.value.length < 8){
    document.querySelector(".invalid-feedback3").innerHTML = "Password should be minimum 8 characters";
    passwordTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Password");
  } 
  else if (!passwordSymbols.test(passwordTxtBx.value)){
    document.querySelector(".invalid-feedback3").innerHTML = "Password should contain symbols";
    passwordTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Password");
  } else if (!passwordNumbers.test(passwordTxtBx.value)){
    document.querySelector(".invalid-feedback3").innerHTML = "Password should contain numbers";
    passwordTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Password");
  } else if (!passwordSmall.test(passwordTxtBx.value)){
    document.querySelector(".invalid-feedback3").innerHTML = "Password should contain small letters";
    passwordTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Password");
  } else if (!passwordCapital.test(passwordTxtBx.value)){
    document.querySelector(".invalid-feedback3").innerHTML = "Password should contain capital letters";
    passwordTxtBx.classList.add("is-invalid");
    checker = false;
    missing.push(" Password");
  } else {
    passwordTxtBx.classList.remove("is-invalid");
  }

  return {
    'missing': missing,
    'checker': checker
  };
}

/* 

validate email

*/
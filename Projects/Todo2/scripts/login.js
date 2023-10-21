
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

const dbref = ref(db);

// End of Database --------------------------------------------------------------------------------- 

let emailTxtBx= document.querySelector("#emailTxtBx");
// let usernameTxtBx = document.querySelector("#usernameTxtBx");
let passwordTxtBx = document.querySelector("#passwordTxtBx");

let saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener('click', lookData);

function lookData(){
  let checker = false;
  let match = false;
  get(child(dbref, "Records/"))
    .then((snapshot)=>{
      if(snapshot.exists()){
        const objs = snapshot.val();
        for (const key in objs) {
          if(objs[key].email === emailTxtBx.value){
            if(objs[key].password === passwordTxtBx.value){
              localStorage.setItem("userId",objs[key].id);
              localStorage.setItem("userName",objs[key].name);
              match = true;
            } else {
              alert("Email and password does not match");
              match = false;
            }
            checker = true
            break;
          } else {
            checker = false;
          }  
        }  
      }  
      if(checker && match){
        location.href="./todo.html";
      } else if(!checker) {
        alert("User does not exists!")
      }
    })
    .catch((error)=>{
      alert(error)
    })
}




// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgaOAg7WB9CgQF_e4SD3Wu_XdtwMumnc0",
  authDomain: "application-282e1.firebaseapp.com",
  projectId: "application-282e1",
  storageBucket: "application-282e1.appspot.com",
  messagingSenderId: "17267227842",
  appId: "1:17267227842:web:27b25129506afc31d48f5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);
const auth = getAuth();

const loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click", login)
console.log(loginBtn)

window.addEventListener("load", function () {
    if (localStorage.getItem("user") !== null) {
        // history.back()
        return
    }
})

async function login(e) {
    try {

        const userEmail = document.getElementById("userEmail").value
        const userPasword = document.getElementById("userPasword").value
  
        const userLogin = await signInWithEmailAndPassword(auth, userEmail, userPasword)
        console.log(userLogin)
 
        const userRef = doc(db, "users", userLogin.user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            alert("invalid user")
            return
        }

        console.log("Document data:", docSnap.data());
        const userData = docSnap.data()
        localStorage.setItem("user", JSON.stringify(userData))
        window.location.assign("./dashboard.html")
        

    } catch (error) {
        console.log("error", error.message)
        loginBtn.className = "btn btn-danger"
        loginBtn.innerHTML = `Login`
        alert(error.message)
    }


}
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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



const signupBtn = document.getElementById("signupBtn")
signupBtn.addEventListener("click", signUp)


async function signUp(e) {
        try {
            const userName = document.getElementById("userName").value
            const phoneNumber = document.getElementById("phoneNumber").value
            const userEmail = document.getElementById("userEmail").value
            const userPasword = document.getElementById("userPasword").value
           
    
            if (!userName || !phoneNumber|| !userEmail || !userPasword ) {
                alert("Fields are emapty")
                return
            } 
           
          

            const userAuth = await createUserWithEmailAndPassword(auth, userEmail, userPasword)
            console.log(userAuth.user.uid)
            const uid = userAuth.user.uid
            const userObj = {
                userName,
                phoneNumber,
                userEmail,
                uid,
            }
            const userRef = doc(db, "users", uid);
            const userDB = await setDoc(userRef, userObj);
            window.location.replace ("./index.html")
        } catch (error) {
            console.log("error", error.message)
            alert(error.message)
        }
    
    
    }
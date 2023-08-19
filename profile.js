import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc,getDoc} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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

const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);
const auth = getAuth();



const userName1 = document.getElementById("userName1")
const userEmail1 = document.getElementById("userEmail1")
const phoneNumber1 = document.getElementById("phoneNumber1")


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            userName1.textContent = `Name: ${userData.userName}`;
            userEmail1.textContent = `Email: ${userData.userEmail}`;
            phoneNumber1.textContent = `Phone Number: ${userData.phoneNumber}`;
        }
    }
})

const logout=document.getElementById("logout")
logout.addEventListener("click", function(){
    localStorage.removeItem("user")
    window.location.replace("../index.html")
})
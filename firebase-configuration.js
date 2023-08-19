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
  
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, getDocs, collection, addDoc,getDoc} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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



const logoutBtn = document.getElementById("logout")
const getUser = document.getElementById("getUser")

const productCollection = collection(db, "product")
const ProductForm = document.getElementById("productForm")
ProductForm.addEventListener("submit", addproduct)
window.addEventListener("load", getProduct)
window.addEventListener("load", loginUser)
const productParent = document.getElementById("productParent")
function loginUser() {
    if (localStorage.getItem("user") === null) {
        window.location.replace("../index.html")
        return
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            getUser.textContent = `${userData.userName}`;
        }
    }
})

async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        console.log(doc.data())
        const getData = doc.data();
        console.log(getData)
        productParent.innerHTML += `<div class="card mt-5" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${getData.name}</h5>
            <p class="card-text">${getData.desc}</p>
            <button class="editBtn btn btn-primary">Edit</button>
            <button class="dltBtn btn btn-primary">Delete</button>
        </div>
    </div>`
    })

}


document.addEventListener('click', function () {
    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.dltBtn');
  
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        const itemText = this.parentNode.querySelector('.card-text');
        const newText = prompt('Edit the item:', itemText.textContent);
        if (newText !== null) {
          itemText.textContent = newText;
        }
      });
    });

    deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
    const listItem = button.parentNode;
    listItem.remove();
  });
});;
});








async function addproduct(e) {
    e.preventDefault();
    try {
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value
        if(!productName|| !productDesc){
            swal("Error",  "Please enter input feilds")
            return
        }
        const user = JSON.parse(localStorage.getItem("user"))
        const productObj = {
            name: productName,
            desc: productDesc,
        }
        console.log("Add", productObj)

        await addDoc(productCollection, productObj)
        alert("Product Added Successfully")


    } catch (error) {
        alert(error.message)
    }

}

const logout=document.getElementById("logout")
logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("user")
    window.location.replace("../index.html")
})

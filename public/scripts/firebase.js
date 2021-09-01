const firebaseConfig = {
    apiKey: "AIzaSyBKjpDimBcDkml0O0EuRXrgJHWim35-5ig",
    authDomain: "bookorner-7193a.firebaseapp.com",
    projectId: "bookorner-7193a",
    storageBucket: "bookorner-7193a.appspot.com",
    messagingSenderId: "531988634949",
    appId: "1:531988634949:web:58b41d1b7401862e9b322c",
    measurementId: "G-DP7DBC9TBQ"
};

firebase.initializeApp(firebaseConfig);

document.getElementById("login").addEventListener("click", googleLogin);
document.getElementById("logout").addEventListener("click", logoutUser);
document.getElementById("logout").style.display = "none";

let provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
    firebase.auth().signInWithPopup(provider).then(res => {
        console.log(res);
        console.log(res.user.displayName);
        showUserDetails(res.user);
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("userDetails").style.display = "block";
    }).catch(error => {
        console.log(error);
    })
}

function showUserDetails(user) {
    document.getElementById("userDetails").innerHTML = user.displayName;
}

function logoutUser() {
    firebase.auth().signOut().then(() => {
        document.getElementById("logout").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("userDetails").style.display = "none";
        console.log("Logout successful!");
    })
}
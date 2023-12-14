let indexedDBLogged = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let dbLogged;

function startDbLogged() {
    let request = indexedDBLogged.open("franciscoLoggedUser");

    request.addEventListener("error", showError);
    request.addEventListener("success", startLogged);
    request.addEventListener("upgradeneeded", createStorageLogged);
}

function showError(e) {
    alert("We have an error: " + e.code + " / " + e.message);
}

function startLogged(e) {
    dbLogged = e.target.result;
    console.log("working ", dbLogged);
    showUser();
}

function createStorageLogged(e) {
    let database = e.target.result;
    let storage = database.createObjectStore("franciscoUser", {keyPath: "id", autoIncrement: true});
    storage.createIndex("userName", "userName", {unique: false});
    storage.createIndex("userEmail", "userEmail", {unique: true});
    storage.createIndex("userPwd", "userPwd", {unique: false});
    storage.createIndex("userAdmin", "userAdmin", {unique: false});
    storage.createIndex("userAvatar", "userAvatar", {unique: false});
}

function showUser() {
    let request = dbLogged.transaction ("franciscoUser").objectStore("franciscoUser").getAll();

    request.onsuccess = ()=> {
        let user = request.result;
        if(user.length != 0) {
            let profilePicture = document.querySelector("#profile");
            profilePicture.innerHTML = `<img src="/UD5_Activity2/img/${user[0]["userAvatar"]}.jpg" width="50px" class="rounded-5 p-0 nav-link ms-2">`;
            let userNameHTML = document.querySelector("#user_name");
            userNameHTML.innerHTML = `<span class="nav-link">${user[0]["userName"]}</span>`;
            let logout = document.querySelector("#logout");
            logout.innerHTML = `<button class="nav-link activeLogout rounded-2" onclick="logout()">Log Out</button>`;
        } else {
            let register = document.querySelector("#register");
            register.innerHTML = `<a class="nav-link active rounded-2" aria-current="page" href="/UD5_Activity2/html/register.html">Register</a>`
        }
    }

    request.onerror = ()=> {
        console.table("There was an error");
    }
}

function logout() {
    let transactionsLogged = dbLogged.transaction(["franciscoUser"], "readwrite");
    const objectStore = transactionsLogged.objectStore("franciscoUser");
    const objectStoreRequest = objectStore.clear();
    window.location.assign("/UD5_Activity2/index.html");
}

window.addEventListener("load", startDbLogged);
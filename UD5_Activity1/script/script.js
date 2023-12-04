let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const form = document.getElementById('form');
const name = document.querySelector("#user_name");
const email = document.querySelector("#user_email");
const pwd = document.querySelector("#user_pwd");
const pwd2 = document.querySelector("#user_pwd2");
let userAvatar;
let db;

function startDb() {
    form.addEventListener("submit", storeUser);

    let request = indexedDB.open("frnaciscoUserData");

    request.addEventListener("error", showError);
    request.addEventListener("success", start);
    request.addEventListener("upgradeneeded", createStorage);
}

function showError(e) {
    alert("We have an error: " + e.code + " / " + e.message);
}

function start(e) {
    db = e.target.result;
    console.log("working ", db);
}

function createStorage(e) {
    let database = e.target.result;
    let storage = database.createObjectStore("frnaciscoUsers", {keyPath: "user_email"});
    storage.createIndex("User_name", "user_name", {unique: false});
}

function isRequired(inputArray) {

    inputArray.forEach((input) => {
        if(input.value.trim() === '') {
            showIncorrect(input, `${prenNomInput(input)} is required`);
        } else {
            showCorrect(input);
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showIncorrect(input, 'Ha de tener un minim de ' + min + ' caracters')
    } else if(input.value.length > max) {
        showIncorrect(input, 'Ha de tener un minim de ' + max + ' caracters')
    } else {
        showCorrect(input);
    }
}

function isEmailValid(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())) {
        showCorrect(input);
    } else {
        let missatge = `${prenNomInput(input)} No te el format correcte`;
        showIncorrect(input, missatge)
    }
}

function checkPassword(input1, input2) {
    if(input1.value != input2.value) {
        let missatge = `${prenNomInput(input2)} ha de ser igual a ${prenNomInput(input1)}`;
        showIncorrect(input2, missatge);
    }
}

function showIncorrect(input, missatge) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const label = formControl.querySelector('label');
    const small = formControl.querySelector('small');
    small.innerText = label.innerText + ' ' +missatge;
}

function showCorrect(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control correct';
}

function prenNomInput(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function radioValue(event) {
    userAvatar = event;
}

function storeUser(e) {
    e.preventDefault();

    isRequired([name, email, pwd, pwd2]);

    checkLength(name, 3, 15);
    checkLength(pwd, 8, 25);

    isEmailValid(email);
    checkPassword(pwd, pwd2);

    let userName = document.querySelector("#user_name").value;
    let userEmail = document.querySelector("#user_email").value;
    let userPwd = document.querySelector("#user_pwd").value;
    let userRole;

    if(document.querySelector("#role").checked) {
        userRole = true;
    } else {
        userRole = false;
    }

    let transactions = db.transaction(["frnaciscoUsers"], "readwrite");
    let storage = transactions.objectStore("frnaciscoUsers");

    storage.add({
        user_name: userName,
        user_email: userEmail,
        user_pwd: userPwd,
        admin: userRole,
        avatars: userAvatar
    });

    // if(userRole) {
    //     window.location.assign("./../html/admin.html");
    // } else {
    //     window.location.assign("./../index.html");
    // }

    let profilePicture = document.querySelector("#profile");
    profilePicture.innerHTML = `<img src="./../img/${userAvatar}.jpg" width="50px" class="rounded-5">`;
    let userNameHTML = document.querySelector("#userName");
    userNameHTML.innerHTML = `<span class="nav-link">${userName}</span>`
}

window.addEventListener("load", startDb);
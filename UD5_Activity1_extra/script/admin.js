let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let db;
const container = document.getElementsByClassName('container-popup');
const closePop = document.getElementsByClassName('close-popup');
const updateUser = document.getElementById('updateUser');
let userAvatar;

function startDb() {
    let request = indexedDB.open("franciscoUserData");

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
    collectUsers();
}

function createStorage(e) {
    let database = e.target.result;
    let storage = database.createObjectStore("franciscoUsers", {keyPath: "id", autoIncrement: true});
    storage.createIndex("userName", "userName", {unique: false});
    storage.createIndex("userEmail", "userEmail", {unique: true});
    storage.createIndex("userPwd", "userPwd", {unique: false});
    storage.createIndex("userAdmin", "userAdmin", {unique: false});
    storage.createIndex("userAvatar", "userAvatar", {unique: false});
}

function collectUsers() {
    let request = db.transaction ("franciscoUsers").objectStore("franciscoUsers").getAll();

    request.onsuccess = ()=> {
        let requestDbLogged = dbLogged.transaction ("franciscoUser").objectStore("franciscoUser").getAll();

        requestDbLogged.onsuccess = ()=> {
            let users = request.result;
            let user = requestDbLogged.result;
            if(user.length != 0 && user[0]["userAdmin"] == true) {
                if(users.length != 0) {
                    let usersHTML = document.querySelector("#users");
                    users.forEach(user => {
                        usersHTML.innerHTML += `<div class="bg-primary p-1 rounded-2"><img src="../img/${user["userAvatar"]}.jpg" width="50px" class="rounded-5 me-2"><span>${user["userName"]}</span><button class="activeLogout rounded-2 p-1 reset">Reset Password</button><button class="activeLogout rounded-2 p-1 edit">Edit User</button><button class="activeLogout rounded-2 p-1 delete">Delete User</button></div>`;
                    });
                    let edit = document.querySelectorAll('.edit');
                    let password = document.querySelectorAll('.reset');
                    let deleteUser = document.querySelectorAll('.delete');
                    for(let i = 0; i<users.length;i++) {
                        edit[i].addEventListener('click', () => {
                            let userNameHTML = document.querySelector("#userName");
                            let userEmailHTML = document.querySelector("#userEmail");
                            userNameHTML.value = `${users[i]["userName"]}`;
                            userEmailHTML.value = `${users[i]["userEmail"]}`;
                            container[0].style.display = 'block';
                            updateUser.addEventListener('click', () => {
                                let name = document.querySelector("#userName");
                                let email = document.querySelector("#userEmail");

                                let userName = document.querySelector("#userName").value;
                                let userEmail = document.querySelector("#userEmail").value;
                                let userPwd = users[i]["userPwd"];
                                let userAdmin = users[i]["userAdmin"];
                                if(userAvatar == null) {
                                    userAvatar = users[i]["userAvatar"];
                                }

                                if(isRequired([name, email]) && isEmailValid(email)) {
                                    let obj = {
                                        id: (users[i]["id"]),
                                        userName: userName,
                                        userEmail: userEmail,
                                        userPwd: userPwd,
                                        userAdmin: userAdmin,
                                        userAvatar: userAvatar
                                    };
                                    if(user[0]["userEmail"] == obj.userEmail) {
                                        let transactionsLogged = dbLogged.transaction (["franciscoUser"], "readwrite");
                                        let storageLogged = transactionsLogged.objectStore("franciscoUser");
                                        let LoggedRequest = storageLogged.clear();

                                        LoggedRequest.onsuccess = () => {
                                            storageLogged.put(obj);
                                        };
                                    }
                                    let transactions = db.transaction(["franciscoUsers"], "readwrite");
                                    let storage = transactions.objectStore("franciscoUsers");
                                    storage.put(obj);
                                    container[0].style.display = 'none';
                                    location.reload();
                                }
                            });
                        });
                        password[i].addEventListener('click', () => {
                            container[1].style.display = 'block';
                            const yes = document.getElementById('yesPwd');
                            const no = document.getElementById('noPwd');
                            yes.addEventListener('click', () => {
                                let userName = users[i]["userName"];
                                let userEmail = users[i]["userEmail"];
                                let pwd = "12345*aA";
                                let userAdmin = users[i]["userAdmin"];
                                let userAvatar = users[i]["userAvatar"];

                                let obj = {
                                    id: (users[i]["id"]),
                                    userName: userName,
                                    userEmail: userEmail,
                                    userPwd: pwd,
                                    userAdmin: userAdmin,
                                    userAvatar: userAvatar
                                };
                                if(user[0]["userEmail"] == obj.userEmail) {
                                    let transactionsLogged = dbLogged.transaction (["franciscoUser"], "readwrite");
                                    let storageLogged = transactionsLogged.objectStore("franciscoUser");
                                    let LoggedRequest = storageLogged.clear();

                                    LoggedRequest.onsuccess = () => {
                                        storageLogged.put(obj);
                                    };
                                }
                                let transactions = db.transaction(["franciscoUsers"], "readwrite");
                                let storage = transactions.objectStore("franciscoUsers");
                                storage.put(obj);
                                location.reload();
                            });
                            no.addEventListener('click', () => {
                                container[1].style.display = 'none';
                            });
                        });
                        deleteUser[i].addEventListener('click', () => {
                            container[2].style.display = 'block';
                            const yes = document.getElementById('yesDel');
                            const no = document.getElementById('noDel');
                            yes.addEventListener('click', () => {
                                let userEmail = users[i]["userEmail"];

                                let transactions = db.transaction(["franciscoUsers"], "readwrite");
                                let storage = transactions.objectStore("franciscoUsers");
                                storage.delete(users[i]["id"]);

                                if(user[0]["userEmail"] == userEmail) {
                                    let transactionsLogged = dbLogged.transaction (["franciscoUser"], "readwrite");
                                    let storageLogged = transactionsLogged.objectStore("franciscoUser");
                                    storageLogged.delete(users[i]["id"]);
                                }
                                location.reload();
                            });
                            no.addEventListener('click', () => {
                                container[2].style.display = 'none';
                            });
                        });
                    };

                    closePop[0].addEventListener('click', () => {
                        container[0].style.display = 'none';
                    });

                    closePop[1].addEventListener('click', () => {
                        container[1].style.display = 'none';
                    });

                    closePop[2].addEventListener('click', () => {
                        container[2].style.display = 'none';
                    });

                    function isRequired(inputArray) {
                        let cont = 0;

                        inputArray.forEach((input) => {
                            if(input.value.trim() === '') {
                                showIncorrect(input, `${prenNomInput(input)} is required`);
                            } else {
                                showCorrect(input);
                                cont++;
                            }
                        });

                        if(cont == 2) {
                            return true;
                        }
                    }

                    function isEmailValid(input) {
                        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if(re.test(input.value.trim())) {
                            showCorrect(input);
                            return true;
                        } else {
                            let missatge = `${prenNomInput(input)} No te el format correcte`;
                            showIncorrect(input, missatge)
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

                } else {
                    let usersHTML = document.querySelector("#users");
                    usersHTML.innerHTML = `<div class="bg-primary p-1 rounded-2"><span>There are no users</span></div>`
                }
            } else {
                window.location.assign("../index.html");
            }
        }
    }

    request.onerror = ()=> {
        console.log("There was an error");
    }
}

function radioValue(event) {
    userAvatar = event;
}

window.addEventListener("load", startDb);
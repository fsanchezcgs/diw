let indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;

function startDb() {
  form.addEventListener("submit", searchUsers);

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
}

function createStorage(e) {
  let database = e.target.result;
  let storage = database.createObjectStore("franciscoUsers", {
    keyPath: "id",
    autoIncrement: true,
  });
  storage.createIndex("userName", "userName", { unique: false });
  storage.createIndex("userEmail", "userEmail", { unique: true });
  storage.createIndex("userPwd", "userPwd", { unique: false });
  storage.createIndex("userAdmin", "userAdmin", { unique: false });
  storage.createIndex("userAvatar", "userAvatar", { unique: false });
}

function searchUsers(e) {
  e.preventDefault();

  let email = document.querySelector("#userEmail");
  let pwd = document.querySelector("#userPwd");

  if (isRequired([email, pwd]) && isEmailValid(email) && isPwdValid(pwd)) {
    let userEmail = document.querySelector("#userEmail").value;
    let userPwd = document.querySelector("#userPwd").value;

    let transactions = db.transaction(["franciscoUsers"], "readwrite");
    let storage = transactions.objectStore("franciscoUsers");
    let search = storage.openCursor();

    search.onsuccess = (e) => {
      const pointer = e.target.result;
      if (
        pointer.value.userEmail === userEmail &&
        pointer.value.userPwd === userPwd
      ) {
        const user = pointer.value;
        let transactionsLogged = dbLogged.transaction(
          ["franciscoUser"],
          "readwrite"
        );
        let storageLogged = transactionsLogged.objectStore("franciscoUser");
        let logining = storageLogged.add(user);
        logining.onsuccess = () => {
          if (user.userAdmin == true) {
            window.location.assign("admin.html");
          } else {
            window.location.assign("../index.html");
          }
        };
      }
      pointer.continue();
    };
  }
}

function isRequired(inputArray) {
  let cont = 0;

  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showIncorrect(input, `${prenNomInput(input)} is required`);
    } else {
      showCorrect(input);
      cont++;
    }
  });

  if (cont == 2) {
    return true;
  } else {
    return false;
  }
}

function isEmailValid(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showCorrect(input);
    return true;
  } else {
    let missatge = `${prenNomInput(input)} No te el format correcte`;
    showIncorrect(input, missatge);
    return false;
  }
}

function isPwdValid(input) {
  const re =
    /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/;

  if (re.test(input.value.trim())) {
    showCorrect(input);
    return true;
  } else {
    let missatge = `${prenNomInput(input)} No te el format correcte`;
    showIncorrect(input, missatge);
    return false;
  }
}

function showIncorrect(input, missatge) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const label = formControl.querySelector("label");
  const small = formControl.querySelector("small");
  small.innerText = label.innerText + " " + missatge;
}

function showCorrect(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control correct";
}

function prenNomInput(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

window.addEventListener("load", startDb);

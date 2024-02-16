const form = document.getElementById("form");
let userAvatar;

form.addEventListener("submit", storeUser);

function isRequired(inputArray) {
  let cont = 0;

  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showIncorrect(input, ` is required`);
    } else {
      showCorrect(input);
      cont++;
    }
  });

  if (cont == 4) {
    return true;
  } else {
    return false;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showIncorrect(input, "Ha de tener un minim de " + min + " caracters");
    return false;
  } else if (input.value.length > max) {
    showIncorrect(input, "Ha de tener un minim de " + max + " caracters");
    return false;
  } else {
    showCorrect(input);
    return true;
  }
}

function isEmailValid(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showCorrect(input);
    return true;
  } else {
    let missatge = ` is not in the correct format`;
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
    let missatge = ` is not in the correct format`;
    showIncorrect(input, missatge);
    return false;
  }
}

function checkPassword(input1, input2) {
  if (input1.value != input2.value) {
    let missatge = ` must be equal to Password`;
    showIncorrect(input2, missatge);
    return false;
  } else {
    return true;
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

function radioValue(event) {
  userAvatar = event;
}

function storeUser(e) {
  e.preventDefault();

  let name = document.querySelector("#userName");
  let email = document.querySelector("#userEmail");
  let pwd = document.querySelector("#userPwd");
  let pwd2 = document.querySelector("#userPwd2");

  let userName = document.querySelector("#userName").value;
  let userEmail = document.querySelector("#userEmail").value;
  let userPwd = document.querySelector("#userPwd").value;
  let userAdmin;

  if (document.querySelector("#userAdmin").checked) {
    userAdmin = true;
  } else {
    userAdmin = false;
  }

  let obj = {
    userName: userName,
    userEmail: userEmail,
    userPwd: userPwd,
    userAdmin: userAdmin,
    userAvatar: userAvatar,
  };

  let transactions = db.transaction(["franciscoUsers"], "readwrite");
  let storage = transactions.objectStore("franciscoUsers");

  if (
    isRequired([name, email, pwd, pwd2]) &&
    isEmailValid(email) &&
    checkLength(pwd, 8, 25) &&
    isPwdValid(pwd) &&
    checkPassword(pwd, pwd2)
  ) {
    const record = storage.add(obj);
    record.onsuccess = () => storeUserLogged(obj);
    record.onerror = () => {
      let missatge = ` it's already used`;
      showIncorrect(email, missatge);
    };
  }
}

function storeUserLogged(obj) {
  let transactionsLogged = dbLogged.transaction(["franciscoUser"], "readwrite");
  const objectStore = transactionsLogged.objectStore("franciscoUser");
  const objectStoreRequest = objectStore.clear();

  objectStoreRequest.onsuccess = () => {
    let storageLogged = transactionsLogged.objectStore("franciscoUser");

    storageLogged.add(obj);

    if (obj.userAdmin == true) {
      window.location.assign("admin.html");
    } else {
      window.location.assign("../index.html");
    }
  };
}

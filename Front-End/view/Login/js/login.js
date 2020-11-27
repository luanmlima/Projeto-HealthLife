let endMessage = document.querySelector("#endMessage");
let status = 0;

let email = document.querySelector("#email");
let password = document.querySelector("#password");

function loginUser(event, usuario) {
  event.preventDefault();
  loginInfo = {
    login: email.value,
    senha: password.value,
  };
  const options = {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify(loginInfo),
  };
  console.log(JSON.stringify(loginInfo));
  fetch(`http://localhost:5000/${usuario}`, options)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((resp) => {
      console.log(resp.especialidade);
      if (status != 200) {
        registerErrorOrSuccess(resp.message, status);
      } else {
        localStorage.setItem("user", JSON.stringify(resp));
        window.location.replace(`../viewLogado/${usuario}/Home/index.html`); 
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function registerErrorOrSuccess(message) {
  if (endMessage.classList.contains("successTxt")) {
    endMessage.classList.remove("successTxt");
  }
  endMessage.classList.add("errorTxt");
  endMessage.innerHTML = message;
}

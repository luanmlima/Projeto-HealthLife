let paciente = JSON.parse(localStorage.getItem("user"))

let status = 0;

let nome = document.getElementById("nome").value = paciente.nome.split(" ")[0];
let sobrenome = document.getElementById("sobrenome").value = paciente.nome.split(" ")[1] ? paciente.nome.split(" ")[1] : "";
let idade = document.getElementById("idade").value = paciente.idade;

function voltaParaLogin(){
  window.location.replace(`../../../Login/index.html`);
}

function sair(){
  localStorage.removeItem("user")
  voltaParaLogin()
}

function salvar(event) {
  event.preventDefault();

  let nome = document.getElementById("nome").value;
  let sobrenome = document.getElementById("sobrenome").value;
  let idade = document.getElementById("idade").value;

  if(nome === "" || sobrenome === "" || idade === "" ){
    registerErrorOrSuccess("Preencha todos os campos para fazer o cadastro");
  }else{
    let nomeCompleto = `${nome} ${sobrenome}`

    cadastroInfo = {
      id: paciente.codpaciente,
      nome:nomeCompleto,
      idade:Number(idade)
    };
    console.log(cadastroInfo);
    const options = {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(cadastroInfo),
    };
    fetch(`http://localhost:5000/paciente/atualizar`, options)
      .then((resp) => {
        status = resp.status;
        return resp.json();
      })
      .then((resp) => {
        if (status != 200) {
          registerErrorOrSuccess(resp.message);
        } else {
          sucess()
          console.log(resp);
          localStorage.setItem("user", JSON.stringify(resp))

          setTimeout(() => {
            window.location.replace(`../Home/index.html`); 
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function registerErrorOrSuccess(message) {
  if (endMessage.classList.contains("successTxt")) {
    endMessage.classList.remove("successTxt");
  }
  endMessage.classList.add("errorTxt");
  endMessage.innerHTML = message;
}

function sucess(){
  if (endMessage.classList.contains("errorTxt")) {
    endMessage.classList.remove("errorTxt");
  }
  endMessage.classList.add("successTxt");
  endMessage.innerHTML = "Usuario atualizado com sucesso"
}

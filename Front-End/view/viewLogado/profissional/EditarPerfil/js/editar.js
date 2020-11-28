let profissional = JSON.parse(localStorage.getItem("user"))
let status = 0;

let nome = document.getElementById("nome").value = profissional.nome.split(" ")[0];
let sobrenome = document.getElementById("sobrenome").value = profissional.nome.split(" ")[1] ? profissional.nome.split(" ")[1] : "";
let anosExperiencia = document.getElementById("anosExperiencia").value = profissional.anosExperiencia;
let numeroDiploma = document.getElementById("numeroDiploma").value = profissional.numeroDiploma;
let numeroCarteira = document.getElementById("numeroCarteira").value = profissional.numeroCarteira;
let rua = document.getElementById("rua").value = profissional.endereco.rua;
let cidade = document.getElementById("cidade").value = profissional.endereco.cidade;
let bairro = document.getElementById("bairro").value = profissional.endereco.bairro;
let numero = document.getElementById("numero").value = profissional.endereco.numero;
let sala = document.getElementById("sala").value = profissional.endereco.sala;

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
  let anosExperiencia = document.getElementById("anosExperiencia").value;
  let numeroDiploma = document.getElementById("numeroDiploma").value;
  let numeroCarteira = document.getElementById("numeroCarteira").value;
  let rua = document.getElementById("rua").value;
  let cidade = document.getElementById("cidade").value;
  let bairro = document.getElementById("bairro").value;
  let numero = document.getElementById("numero").value;
  let sala = document.getElementById("sala").value;


  if( nome === "" || sobrenome === "" || anosExperiencia === ""|| numeroDiploma === ""|| numeroCarteira === ""|| rua === ""|| cidade === ""
  || bairro === ""|| numero === "" || sala === "" ){
    registerErrorOrSuccess("Preencha todos os campos para fazer o cadastro");
  }else{
    let nomeCompleto = `${nome} ${sobrenome}`

    cadastroInfo = {
      id: profissional.codprofissional,
      anosExperiencia:Number(anosExperiencia),
      nome:nomeCompleto,
      numeroDiploma:Number(numeroDiploma),
      numeroCarteira:Number(numeroCarteira),
      rua:rua,
      cidade:cidade,
      bairro:bairro,
      numero:Number(numero),
      sala:Number(sala)
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
    fetch(`http://localhost:5000/profissional/atualizar`, options)
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

function desativar(){
  id = profissional.codprofissional;
  const options = {
    method: "DELETE"
  };
  fetch(`http://localhost:5000/profissional/${id}`, options)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((resp) => {
      if (status != 201) {
        registerErrorOrSuccess(resp.message);
      } else {
        sucess(resp.message)
        setTimeout(() => {
          sair()
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
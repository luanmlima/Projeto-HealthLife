

let status = 0;

function cadastrar(event) {
  event.preventDefault();

  let login = document.getElementById("login").value;
  let senha = document.getElementById("senha").value;
  let nome = document.getElementById("nome").value;
  let sobrenome = document.getElementById("sobrenome").value;
  let cpf = document.getElementById("cpf").value;
  let especialidade = document.getElementById("especialidade").value;
  let anosExperiencia = document.getElementById("anosExperiencia").value;
  let numeroDiploma = document.getElementById("numeroDiploma").value;
  let numeroCarteira = document.getElementById("numeroCarteira").value;
  let rua = document.getElementById("rua").value;
  let cidade = document.getElementById("cidade").value;
  let bairro = document.getElementById("bairro").value;
  let numero = document.getElementById("numero").value;
  let sala = document.getElementById("sala").value;


  if(login === "" || senha === "" || nome === "" || sobrenome === "" || cpf === "" || especialidade === ""
  || anosExperiencia === ""|| numeroDiploma === ""|| numeroCarteira === ""|| rua === ""|| cidade === ""
  || bairro === ""|| numero === "" || sala === "" ){
    registerErrorOrSuccess("Preencha todos os campos para fazer o cadastro");
  }else{
    let nomeCompleto = `${nome} ${sobrenome}`

    cadastroInfo = {
      especialidade: especialidade,
      anosExperiencia:Number(anosExperiencia),
      nome:nomeCompleto,
      login:login,
      senha:senha,
      cpf:cpf,
      numeroDiploma:Number(numeroDiploma),
      numeroCarteira:Number(numeroCarteira),
      rua:rua,
      cidade:cidade,
      bairro:bairro,
      numero:Number(numero),
      sala:Number(sala)
    };
    const options = {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(cadastroInfo),
    };
    fetch(`http://localhost:5000/profissional/criar`, options)
      .then((resp) => {
        status = resp.status;
        return resp.json();
      })
      .then((resp) => {
        if (status != 200) {
          registerErrorOrSuccess(resp.message);
        } else {
          sucess()
          setTimeout(() => {
            window.location.replace(`../Login/index.html`); 
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
  endMessage.innerHTML = "Usuario cadastrado com sucesso"
}

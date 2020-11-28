const profissionalLogadoJSON = localStorage.getItem("user")

if(!profissionalLogadoJSON){
  voltaParaLogin()
}

function voltaParaLogin(){
  window.location.replace(`../../../Login/index.html`);
}

const profissional = JSON.parse(profissionalLogadoJSON)

if(profissional.idade){
  window.location.replace(`../../paciente/Home/index.html`);
}

function sair(){
  localStorage.removeItem("user")
  voltaParaLogin()
}
function registerErrorOrSuccess(message) {
  if (endMessage.classList.contains("successTxt")) {
    endMessage.classList.remove("successTxt");
  }
  endMessage.classList.add("errorTxt");
  endMessage.innerHTML = message;
}

function sucess(message){
  if (endMessage.classList.contains("errorTxt")) {
    endMessage.classList.remove("errorTxt");
  }
  endMessage.classList.add("successTxt");
  endMessage.innerHTML = message
}



function formatarEndereco(endereco){
  let enderecoFormatado = `${endereco.rua}, nº${endereco.numero} - ${endereco.sala} - ${endereco.bairro} - ${endereco.cidade}`;
  return enderecoFormatado;
}

function formatarData(data){
  let splitData = data.split('T');
  let dia = splitData[0].split('-');
  let hora = splitData[1].split(':');
  let dataFormatada = `${dia[2]}/${dia[1]}/${dia[0]}`;
  return `${dataFormatada} ${hora[0] - 3}hs`;
}

function deletar(id){
  const options = {
    method: "DELETE"
  };
  fetch(`http://localhost:5000/agendamento/${id}`, options)
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
          location.reload(); 
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
  let conteudo = '';
  
  fetch(`http://localhost:5000/agendamento/${profissional.codprofissional}-profissional`)
    .then((resp) => {
      return resp.json();
    })
    .then((resp) => {
      resp.map(agendamento => {
        conteudo += `<div class="card">
          <div class="card-body">
          <div class="codAgendamento">
            COD: #${agendamento.numeroAgendamento}<br>
            <span><a href="javascript:deletar(${agendamento.numeroAgendamento})">Excluir</a></span>
          </div>
              <ul class="ulAgendamento">
                <li>Data: ${formatarData(agendamento.data)}</li>
                <li>Nome: ${agendamento.nomePaciente}</li>
                <li>Idade: ${agendamento.idadePaciente}</li>
                <li>Profissional: ${agendamento.nomeProfissional}</li>
                <li>Especialidade: ${agendamento.especialidadeProfissional}</li>
                <li>Endereço: ${formatarEndereco(agendamento.endereco)}</li>
              </ul>
            </div>
        </div>`;
      });

      let div = document.getElementById('agendamentos');
      div.innerHTML = conteudo;
    })
    .catch((error) => {
      console.log(error);
  });
});
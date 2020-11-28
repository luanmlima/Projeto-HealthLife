const pacienteLogadoJSON = localStorage.getItem("user")
if(!pacienteLogadoJSON){
  voltaParaLogin()
}
const paciente = JSON.parse(pacienteLogadoJSON)
if(paciente.especialidade){
  window.location.replace(`../../profissional/Home/index.html`);
}

function voltaParaLogin(){
  window.location.replace(`../../../Login/index.html`);
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

function formatarData(data, hora){
  let horaAgendada = hora.replace('hrs', ':00:00');
  return `${data} ${horaAgendada}`;
}

function buscarHorasDisponiveis(){
  let profissionalSelecionado = document.getElementById('profissional').value;
  let dataSelecionada = document.getElementById('data').value;
  let botaoSalvar = document.getElementById('buttonSalvar');
  botaoSalvar.setAttribute('disabled', 'disabled');

  if(isNaN(profissionalSelecionado) == false && dataSelecionada !== ''){

    fetch(`http://localhost:5000/agendamento/horas/${profissionalSelecionado}*${dataSelecionada}`)
      .then((resp) => {
        status = resp.status
        return resp.json();
      })
      .then((resp) => {
        conteudo = '<label>Selecione uma hora</label><select class="form-control form-group" required id="horaEscolhida">';
        resp.map(horaDisponivel => {
          conteudo += `<option value="${horaDisponivel}">${horaDisponivel}hrs</option>`
        });

        let div = document.getElementById('horasDisponiveis');
        div.innerHTML = conteudo+'</select>';
        botaoSalvar.removeAttribute('disabled');
      })
      .catch((error) => {
        console.log(error);
    });

  }

}

function salvarAgendamento(event){
  event.preventDefault();

  let dataagendada = document.getElementById("data").value;
  let horaAgendada = document.getElementById("horaEscolhida").value;
  let data = formatarData(dataagendada, horaAgendada);
  let codpaciente = paciente.codpaciente;
  let codprofissional = document.getElementById("profissional").value;

  cadastroInfo = {
    dataagendada:data,
    codpaciente: codpaciente,
    codprofissional:codprofissional
  };
  console.log(cadastroInfo);
  const options = {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify(cadastroInfo),
  };
  fetch(`http://localhost:5000/agendamento/criar`, options)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((resp) => {
      if (status != 200) {
        registerErrorOrSuccess(resp.message);
      } else {
        sucess("Agendamento criado com sucesso")
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
  let conteudo = '<option>Selecione um profissional</option>';
  
  fetch(`http://localhost:5000/profissional`)
    .then((resp) => {
      return resp.json();
    })
    .then((resp) => {
      resp.map(profissional => {
        conteudo += `<option value="${profissional.codprofissional}">${profissional.nome} (${profissional.especialidade})</option>`;
      });

      let div = document.getElementById('profissional');
      div.innerHTML = conteudo;
    })
    .catch((error) => {
      console.log(error);
  });
});
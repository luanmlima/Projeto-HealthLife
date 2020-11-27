
const pacienteLogadoJSON = localStorage.getItem("user")
console.log(pacienteLogadoJSON);
if(!pacienteLogadoJSON){
  voltaParaLogin()
}
const paciente = JSON.parse(pacienteLogadoJSON)
console.log(paciente.especialidade);
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




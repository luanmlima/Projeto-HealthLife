const profissionalLogadoJSON = localStorage.getItem("user")

if(!profissionalLogadoJSON){
  voltaParaLogin()
}

function voltaParaLogin(){
  window.location.replace(`../../../Login/index.html`);
}

function sair(){
  localStorage.removeItem("user")
  voltaParaLogin()
}

const profissional = JSON.parse(profissionalLogadoJSON)

if(profissional.idade){
  window.location.replace(`../../paciente/Home/index.html`);
}


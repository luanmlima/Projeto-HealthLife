import Paciente from '../models/Paciente';
import Usuario from '../models/Usuario';
import PacienteDAO from '../dao/PacienteDAO';
import UsuarioDAO from '../dao/UsuarioDAO';

interface PacienteDTO {
  nome: string;
  cpf: string;
  login: string;
  senha: string;
  idade: number;
}

class PacienteController {
  public async cadastrar({ nome, cpf, login, senha, idade }: PacienteDTO) {
    const paciente = new Paciente();
    const usuario = new Usuario();
    const pacienteDao = new PacienteDAO();
    const usuarioDao = new UsuarioDAO();

    usuario.setLogin(login);
    usuario.setSenha(senha);
    usuario.setTipo('Paciente');
    const codusuario = await usuarioDao.cadastrar(usuario);
    if (codusuario) {
      usuario.setId(codusuario);
    }

    paciente.setNome(nome);
    paciente.setCpf(cpf);
    paciente.setIdade(idade);
    paciente.setUsuario(usuario);

    await pacienteDao.cadastrar(paciente);

    return paciente;
  }
}

export default PacienteController;

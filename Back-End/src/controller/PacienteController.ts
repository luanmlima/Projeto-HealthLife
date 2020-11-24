import Paciente from '../models/Paciente';
import Usuario from '../models/Usuario';
import PacienteDAO from '../dao/PacienteDAO';
import UsuarioDAO from '../dao/UsuarioDAO';
import BuscaPorCPFDAO from '../utils/BuscarPorCPFDAO';

interface PacienteDTO {
  nome: string;
  cpf: string;
  login: string;
  senha: string;
  idade: number;
}

class PacienteController {
  public async cadastrar({ nome, cpf, login, senha, idade }: PacienteDTO) {
    try {
      const paciente = new Paciente();
      const usuario = new Usuario();
      const pacienteDao = new PacienteDAO();
      const usuarioDao = new UsuarioDAO();
      const buscaCPF = new BuscaPorCPFDAO();

      const pacienteExiste = await buscaCPF.getCPF(cpf, 'paciente');

      if (pacienteExiste) {
        throw new Error('Paciente já cadastrado');
      }

      usuario.setLogin(login);
      usuario.setSenha(senha);
      usuario.setTipo('Paciente');

      const codusuario = await usuarioDao.cadastrar(usuario);
      if (codusuario instanceof Error) {
        throw new Error('Login já cadastrado');
      }

      paciente.setNome(nome);
      paciente.setCpf(cpf);
      paciente.setIdade(idade);

      if (codusuario) {
        usuario.setId(codusuario);
      }

      paciente.setUsuario(usuario);

      const pacienteCriado = await pacienteDao.cadastrar(paciente);

      return pacienteCriado;
    } catch (err) {
      return err.message;
    }
  }
}

export default PacienteController;

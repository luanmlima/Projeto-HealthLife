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

interface PacienteSemUsuarioDTO {
  nome: string;
  idade: number;
  id: number;
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

  public async atualizar({ nome, id, idade }: PacienteSemUsuarioDTO) {
    try {
      const paciente = new Paciente();
      const pacienteDao = new PacienteDAO();

      paciente.setId(id);
      paciente.setNome(nome);
      paciente.setIdade(idade);

      const pacienteCriado = await pacienteDao.atualizar(paciente);

      return pacienteCriado;
    } catch (err) {
      return err.message;
    }
  }

  public async deletar(id: number) {
    try {
      const paciente = new Paciente();
      const usuario = new Usuario();
      const pacienteDao = new PacienteDAO();
      const usuarioDao = new UsuarioDAO();

      paciente.setId(id);

      const idUsuario = await pacienteDao.deletar(paciente);

      if (idUsuario === 0) {
        throw new Error('Paciente não encontrado');
      }

      usuario.setId(idUsuario);

      await usuarioDao.deletar(usuario);

      return { message: 'Paciente deletado com sucesso' };
    } catch (err) {
      return err.message;
    }
  }

  public async logar(login: string, senha: string) {
    try {
      const paciente = new Paciente();
      const usuario = new Usuario();
      const pacienteDao = new PacienteDAO();
      const usuarioDao = new UsuarioDAO();

      usuario.setLogin(login);
      usuario.setSenha(senha);

      const usuarioLogado = await usuarioDao.login(usuario);
      if (usuarioLogado === 0) {
        throw new Error('Login ou senha incorreta');
      }

      usuario.setId(usuarioLogado);

      paciente.setUsuario(usuario);

      const pacienteLogado = await pacienteDao.login(paciente);

      return pacienteLogado;
    } catch (err) {
      return err.message;
    }
  }

  public async listar(id: number) {
    try {
      const paciente = new Paciente();
      const pacienteDao = new PacienteDAO();

      paciente.setId(id);

      const pacienteListado = await pacienteDao.listar(paciente);

      return pacienteListado;
    } catch (err) {
      return err.message;
    }
  }
}

export default PacienteController;

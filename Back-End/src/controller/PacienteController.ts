import Paciente from '../models/Paciente';
import Usuario from '../models/Usuario';
import PacienteDAO from '../dao/PacienteDAO';
import UsuarioDAO from '../dao/UsuarioDAO';
import BuscaPorCPFDAO from '../dao/BuscarPorCPFDAO';
import BuscaAgendamentosDAO from '../dao/BuscaAgendamentosDAO';

interface PacienteDTO {
  nome: string;
  cpf: string;
  login: string;
  senha: string;
  idade: number;
}
interface PacienteDBDTO {
  codpaciente: number;
  nome: string;
  cpf: string;
  idade: number;
  status: number;
}
interface PacienteSemUsuarioDTO {
  nome: string;
  idade: number;
  id: number;
}
interface MessageRetorno {
  message: string;
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

      if (pacienteExiste === true) {
        throw new Error('Paciente já cadastrado');
      }
      if (pacienteExiste !== false) {
        const pacienteAtualizado = await this.atualizar({
          id: pacienteExiste,
          nome,
          idade,
        });
        usuario.setLogin(login);
        usuario.setSenha(senha);
        usuarioDao.atualizar(usuario, cpf, 'paciente');
        return pacienteAtualizado;
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
      return err;
    }
  }

  public async atualizar({ nome, id, idade }: PacienteSemUsuarioDTO) {
    try {
      const paciente = new Paciente();
      const pacienteDao = new PacienteDAO();

      paciente.setId(id);
      paciente.setNome(nome);
      paciente.setIdade(idade);

      const pacienteAtualizado = await pacienteDao.atualizar(paciente);

      return pacienteAtualizado;
    } catch (err) {
      return err;
    }
  }

  public async deletar(id: number): Promise<MessageRetorno> {
    try {
      const paciente = new Paciente();
      const usuario = new Usuario();
      const pacienteDao = new PacienteDAO();
      const usuarioDao = new UsuarioDAO();
      const buscarAgendamentosExistentes = new BuscaAgendamentosDAO();

      const existeAgendamentosFuturos = await buscarAgendamentosExistentes.getAgendamento(
        id,
        'paciente',
      );
      if (existeAgendamentosFuturos) {
        throw new Error(
          'Existe agendamentos futuros ou com a data de hoje na sua conta, por favor faça o cancelamentos deles antes de desativar sua conta, se esse agendamento for de hoje mas de horas passadas, por favor efetue o cancelamento da sua conta amanhã',
        );
      }

      paciente.setId(id);

      const idUsuario = await pacienteDao.deletar(paciente);

      if (idUsuario === 0) {
        throw new Error('Paciente não encontrado');
      }

      usuario.setId(idUsuario);

      await usuarioDao.deletar(usuario);

      return { message: 'Paciente desativado com sucesso' };
    } catch (err) {
      return err;
    }
  }

  public async logar(login: string, senha: string): Promise<Paciente> {
    try {
      const paciente = new Paciente();
      const usuario = new Usuario();
      const pacienteDao = new PacienteDAO();
      const usuarioDao = new UsuarioDAO();

      usuario.setLogin(login);
      usuario.setSenha(senha);

      const usuarioLogado = await usuarioDao.login(usuario);
      if (usuarioLogado === 0) {
        throw new Error('Login ou senha incorreta ou usuario desativado');
      }

      usuario.setId(usuarioLogado);

      paciente.setUsuario(usuario);

      const pacienteLogado = await pacienteDao.login(paciente);

      return pacienteLogado;
    } catch (err) {
      return err;
    }
  }

  public async listar(id: number): Promise<PacienteDBDTO> {
    try {
      const paciente = new Paciente();
      const pacienteDao = new PacienteDAO();

      paciente.setId(id);

      const pacienteListado = await pacienteDao.listar(paciente);
      if (pacienteListado instanceof Error) {
        throw new Error('Usuario desativado ou não existe');
      }

      return pacienteListado;
    } catch (err) {
      return err;
    }
  }
}

export default PacienteController;

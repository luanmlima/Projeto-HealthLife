import { startOfHour, parseISO } from 'date-fns';
import Agendamento from '../models/Agendamento';
import Profissional from '../models/Profissional';
import Paciente from '../models/Paciente';
import VerificarData from '../utils/VerificarData';
import AgendamentoDAO from '../dao/AgendamentoDAO';

interface MessageRetorno {
  message: string;
}
interface AgendamentoDTO {
  dataagendada: string;
  codpaciente: number;
  codprofissional: number;
}

class AgendamentoController {
  public async cadastrar({
    dataagendada,
    codpaciente,
    codprofissional,
  }: AgendamentoDTO) {
    try {
      const paciente = new Paciente();
      const profissional = new Profissional();
      const agendamento = new Agendamento();
      const verificarData = new VerificarData();
      const agendamentoDao = new AgendamentoDAO();

      const dataFormatada = startOfHour(parseISO(dataagendada));

      const agendamentoExiste = await verificarData.verify(
        dataFormatada,
        codprofissional,
      );

      if (agendamentoExiste) {
        throw new Error(
          'Data solicitada não disponivel para esse profissional',
        );
      }

      paciente.setId(codpaciente);
      profissional.setId(codprofissional);
      agendamento.setPaciente(paciente);
      agendamento.setProfissional(profissional);

      const agendamentoCriado = await agendamentoDao.cadastrar(agendamento);

      return agendamentoCriado;
    } catch (err) {
      return err.message;
    }
  }

  // public async atualizar({ nome, id, idade }: PacienteSemUsuarioDTO) {
  //   try {
  //     const paciente = new Paciente();
  //     const pacienteDao = new PacienteDAO();

  //     paciente.setId(id);
  //     paciente.setNome(nome);
  //     paciente.setIdade(idade);

  //     const pacienteAtualizado = await pacienteDao.atualizar(paciente);

  //     return pacienteAtualizado;
  //   } catch (err) {
  //     return err.message;
  //   }
  // }

  // public async deletar(id: number): Promise<MessageRetorno> {
  //   try {
  //     const paciente = new Paciente();
  //     const usuario = new Usuario();
  //     const pacienteDao = new PacienteDAO();
  //     const usuarioDao = new UsuarioDAO();

  //     paciente.setId(id);

  //     const idUsuario = await pacienteDao.deletar(paciente);

  //     if (idUsuario === 0) {
  //       throw new Error('Paciente não encontrado');
  //     }

  //     usuario.setId(idUsuario);

  //     await usuarioDao.deletar(usuario);

  //     return { message: 'Paciente desativado com sucesso' };
  //   } catch (err) {
  //     return err.message;
  //   }
  // }

  // public async logar(login: string, senha: string): Promise<Paciente> {
  //   try {
  //     const paciente = new Paciente();
  //     const usuario = new Usuario();
  //     const pacienteDao = new PacienteDAO();
  //     const usuarioDao = new UsuarioDAO();

  //     usuario.setLogin(login);
  //     usuario.setSenha(senha);

  //     const usuarioLogado = await usuarioDao.login(usuario);
  //     if (usuarioLogado === 0) {
  //       throw new Error('Login ou senha incorreta ou usuario desativado');
  //     }

  //     usuario.setId(usuarioLogado);

  //     paciente.setUsuario(usuario);

  //     const pacienteLogado = await pacienteDao.login(paciente);

  //     return pacienteLogado;
  //   } catch (err) {
  //     return err.message;
  //   }
  // }

  // public async listar(id: number): Promise<PacienteDBDTO> {
  //   try {
  //     const paciente = new Paciente();
  //     const pacienteDao = new PacienteDAO();

  //     paciente.setId(id);

  //     const pacienteListado = await pacienteDao.listar(paciente);
  //     if (pacienteListado instanceof Error) {
  //       throw new Error('Usuario desativado ou não existe');
  //     }

  //     return pacienteListado;
  //   } catch (err) {
  //     return err.message;
  //   }
  // }
}

export default AgendamentoController;

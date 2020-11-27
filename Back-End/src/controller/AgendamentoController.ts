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
  codagendamento: number;
}

interface EnderecoAgendamento {
  rua: string;
  cidade: string;
  bairro: string;
  numero: number;
  sala: number;
}

interface AgendamentoCompletoDTO {
  numeroAgendamento: number;
  nomePaciente: string;
  idadePaciente: number;
  nomeProfissional: string;
  especialidadeProfissional: string;
  endereco: EnderecoAgendamento;
}

class AgendamentoController {
  public async cadastrar({
    dataagendada,
    codpaciente,
    codprofissional,
  }: AgendamentoDTO): Promise<Agendamento | Error> {
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
          'Data e hora solicitada não disponivel para esse profissional',
        );
      }

      paciente.setId(codpaciente);
      profissional.setId(codprofissional);
      agendamento.setPaciente(paciente);
      agendamento.setProfissional(profissional);
      agendamento.setData(dataFormatada);

      const agendamentoCriado = await agendamentoDao.cadastrar(agendamento);

      return agendamentoCriado;
    } catch (err) {
      return err;
    }
  }

  public async atualizar({
    codagendamento,
    dataagendada,
    codprofissional,
  }: AgendamentoDTO): Promise<Agendamento | Error> {
    try {
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
          'Data e hora solicitada não disponivel para esse profissional',
        );
      }

      agendamento.setData(dataFormatada);
      agendamento.setId(codagendamento);

      const agendamentoAtualizado = await agendamentoDao.atualizar(agendamento);

      return agendamentoAtualizado;
    } catch (err) {
      return err;
    }
  }

  public async deletar(codagendamento: number): Promise<MessageRetorno> {
    try {
      const agendamento = new Agendamento();
      const agendamentoDao = new AgendamentoDAO();

      agendamento.setId(codagendamento);

      const agendamentoDeletado = await agendamentoDao.deletar(agendamento);

      if (agendamentoDeletado === 0) {
        throw new Error('Agendamento não encontrado');
      }

      return { message: 'Agendamento deletado com sucesso' };
    } catch (err) {
      return err;
    }
  }

  public async listar(
    id: number,
    usuario: string,
  ): Promise<AgendamentoCompletoDTO[]> {
    try {
      const agendamento = new Agendamento();
      const agendamentoDao = new AgendamentoDAO();
      const paciente = new Paciente();
      const profissional = new Profissional();

      if (usuario === 'paciente') {
        paciente.setId(id);
        agendamento.setPaciente(paciente);
      } else {
        profissional.setId(id);
        agendamento.setProfissional(profissional);
      }

      const agendamentoListado = await agendamentoDao.listar(
        agendamento,
        usuario,
      );
      if (agendamentoListado instanceof Error) {
        throw new Error('Agendamentos não encontrados');
      }

      return agendamentoListado;
    } catch (err) {
      return err;
    }
  }
}

export default AgendamentoController;

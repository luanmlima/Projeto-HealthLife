import express from 'express';
import AgendamentoController from '../controller/AgendamentoController';

const agendamentoRouter = express.Router();

agendamentoRouter.post('/criar', async (request, response) => {
  try {
    const { dataagendada, codpaciente, codprofissional } = request.body;

    const agendamentoController = new AgendamentoController();

    const agendamentoCriado = await agendamentoController.cadastrar({
      dataagendada,
      codpaciente,
      codprofissional,
      codagendamento: 0,
    });
    if (agendamentoCriado instanceof Error) {
      throw new Error(agendamentoCriado.message);
    }
    response.json(agendamentoCriado);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

agendamentoRouter.put('/atualizar', async (request, response) => {
  try {
    const { dataagendada, codprofissional, codagendamento } = request.body;

    const agendamentoController = new AgendamentoController();

    const agendamentoAtualizado = await agendamentoController.atualizar({
      dataagendada,
      codpaciente: 0,
      codprofissional,
      codagendamento,
    });
    if (agendamentoAtualizado instanceof Error) {
      throw new Error(agendamentoAtualizado.message);
    }
    response.json(agendamentoAtualizado);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

agendamentoRouter.delete('/:codagendamento', async (request, response) => {
  try {
    const { codagendamento } = request.params;

    const agendamentoController = new AgendamentoController();

    const agendamentoDeletadoMessage = await agendamentoController.deletar(
      Number(codagendamento),
    );
    if (agendamentoDeletadoMessage instanceof Error) {
      throw new Error(agendamentoDeletadoMessage.message);
    }
    response.status(201).json(agendamentoDeletadoMessage);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

agendamentoRouter.get('/:busca', async (request, response) => {
  try {
    const { busca } = request.params;

    const [id, usuario] = busca.split('-');
    console.log(id, usuario);

    const agendamentoController = new AgendamentoController();

    const listaAgendamentos = await agendamentoController.listar(
      Number(id),
      usuario,
    );
    if (listaAgendamentos instanceof Error) {
      throw new Error(listaAgendamentos.message);
    }
    response.status(200).json(listaAgendamentos);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

agendamentoRouter.get('/horas/:dia', async (request, response) => {
  try {
    const { dia } = request.params;

    const [id, data] = dia.split('*');

    const agendamentoController = new AgendamentoController();

    const listaAgendamentos = await agendamentoController.listarHorasDisponiveis(
      Number(id),
      data,
    );
    if (listaAgendamentos instanceof Error) {
      throw new Error(listaAgendamentos.message);
    }
    response.status(200).json(listaAgendamentos);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export default agendamentoRouter;

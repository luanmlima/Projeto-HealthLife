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
    response.json(agendamentoCriado);
  } catch (error) {
    response.json({ message: error.message });
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
    response.json(agendamentoAtualizado);
  } catch (error) {
    response.json({ message: error.message });
  }
});

agendamentoRouter.delete('/:codagendamento', async (request, response) => {
  try {
    const { codagendamento } = request.params;

    const agendamentoController = new AgendamentoController();

    const agendamentoDeletadoMessage = await agendamentoController.deletar(
      Number(codagendamento),
    );
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
    response.status(200).json(listaAgendamentos);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export default agendamentoRouter;

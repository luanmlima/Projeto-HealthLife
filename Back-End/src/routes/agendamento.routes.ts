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
    });
    response.json(agendamentoCriado);
  } catch (error) {
    response.json({ message: error.message });
  }
});

// agendamentoRouter.put('/atualizar', async (request, response) => {
//   try {
//     const { nome, id, idade } = request.body;

//     const agendamentoController = new AgendamentoController();

//     const agendamentoAtualizado = await agendamentoController.atualizar({
//       nome,
//       id,
//       idade,
//     });
//     response.json(agendamentoAtualizado);
//   } catch (error) {
//     response.json({ message: error.message });
//   }
// });

// agendamentoRouter.delete('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const agendamentoController = new AgendamentoController();

//     const agendamentoDeletadoMessage = await agendamentoController.deletar(
//       Number(id),
//     );
//     response.status(201).json(agendamentoDeletadoMessage);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// });

// agendamentoRouter.post('/', async (request, response) => {
//   try {
//     const { login, senha } = request.body;

//     const agendamentoController = new AgendamentoController();

//     const agendamentoLogado = await agendamentoController.logar(login, senha);
//     response.status(200).json(agendamentoLogado);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// });

// agendamentoRouter.get('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const agendamentoController = new AgendamentoController();

//     const agendamento = await agendamentoController.listar(Number(id));
//     response.status(200).json(agendamento);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// });

export default agendamentoRouter;

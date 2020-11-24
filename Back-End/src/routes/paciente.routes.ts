import express from 'express';
import PacienteController from '../controller/PacienteController';

const pacienteRouter = express.Router();

pacienteRouter.post('/', async (request, response) => {
  try {
    const { login, senha, nome, cpf, idade } = request.body;

    const pacienteController = new PacienteController();

    const pacienteCriado = await pacienteController.cadastrar({
      login,
      senha,
      nome,
      cpf,
      idade,
    });
    response.json(pacienteCriado);
  } catch (error) {
    response.json({ message: error.message });
  }
});

pacienteRouter.put('/', async (request, response) => {
  try {
    const { nome, id, idade } = request.body;

    const pacienteController = new PacienteController();

    const pacienteAtualizado = await pacienteController.atualizar({
      nome,
      id,
      idade,
    });
    response.json(pacienteAtualizado);
  } catch (error) {
    response.json({ message: error.message });
  }
});

pacienteRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const pacienteController = new PacienteController();

    const pacienteDeletadoMessage = await pacienteController.deletar(
      Number(id),
    );
    response.status(201).json(pacienteDeletadoMessage);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export default pacienteRouter;

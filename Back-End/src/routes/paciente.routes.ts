import express from 'express';
import PacienteController from '../controller/PacienteController';

const pacienteRouter = express.Router();

pacienteRouter.post('/criar', async (request, response) => {
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
    if (pacienteCriado instanceof Error) {
      throw new Error(pacienteCriado.message);
    }
    response.json(pacienteCriado);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

pacienteRouter.put('/atualizar', async (request, response) => {
  try {
    const { nome, id, idade } = request.body;

    const pacienteController = new PacienteController();

    const pacienteAtualizado = await pacienteController.atualizar({
      nome,
      id,
      idade,
    });
    if (pacienteAtualizado instanceof Error) {
      throw new Error(pacienteAtualizado.message);
    }
    response.json(pacienteAtualizado);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

pacienteRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const pacienteController = new PacienteController();

    const pacienteDeletadoMessage = await pacienteController.deletar(
      Number(id),
    );
    if (pacienteDeletadoMessage instanceof Error) {
      throw new Error(pacienteDeletadoMessage.message);
    }
    response.status(201).json(pacienteDeletadoMessage);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

pacienteRouter.post('/', async (request, response) => {
  try {
    const { login, senha } = request.body;

    const pacienteController = new PacienteController();

    const pacienteLogado = await pacienteController.logar(login, senha);
    if (pacienteLogado instanceof Error) {
      throw new Error(pacienteLogado.message);
    }
    response.status(200).json(pacienteLogado);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

pacienteRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const pacienteController = new PacienteController();

    const paciente = await pacienteController.listar(Number(id));
    if (paciente instanceof Error) {
      throw new Error(paciente.message);
    }
    response.status(200).json(paciente);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export default pacienteRouter;

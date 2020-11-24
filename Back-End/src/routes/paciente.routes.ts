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
    console.log(error);
  }
});

export default pacienteRouter;

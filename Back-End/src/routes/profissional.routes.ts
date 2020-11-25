import express from 'express';
import ProfissionalController from '../controller/ProfissionalController';

const profissionalRoute = express.Router();

profissionalRoute.post('/criar', async (request, response) => {
  try {
    const {
      especialidade,
      anosExperiencia,
      nome,
      login,
      senha,
      cpf,
      numeroDiploma,
      numeroCarteira,
      rua,
      cidade,
      bairro,
      numero,
      sala,
    } = request.body;

    const profissionalController = new ProfissionalController();

    const profissionalCriado = await profissionalController.cadastrar({
      especialidade,
      anosExperiencia,
      nome,
      login,
      senha,
      cpf,
      numeroDiploma,
      numeroCarteira,
      rua,
      cidade,
      bairro,
      numero,
      sala,
    });
    response.json(profissionalCriado);
  } catch (error) {
    response.json({ message: error.message });
  }
});

profissionalRoute.put('/atualizar', async (request, response) => {
  try {
    const {
      id,
      anosExperiencia,
      nome,
      numeroDiploma,
      numeroCarteira,
      rua,
      cidade,
      bairro,
      numero,
      sala,
    } = request.body;

    const profissionalController = new ProfissionalController();

    const profissionalAtualizado = await profissionalController.atualizar({
      id,
      anosExperiencia,
      nome,
      numeroDiploma,
      numeroCarteira,
      rua,
      cidade,
      bairro,
      numero,
      sala,
    });
    response.json(profissionalAtualizado);
  } catch (error) {
    response.json({ message: error.message });
  }
});

profissionalRoute.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const profissionalController = new ProfissionalController();

    const profissionalDeletadoMessage = await profissionalController.deletar(
      Number(id),
    );
    response.status(201).json(profissionalDeletadoMessage);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

profissionalRoute.post('/', async (request, response) => {
  try {
    const { login, senha } = request.body;

    const profissionalController = new ProfissionalController();

    const profissionalLogado = await profissionalController.logar(login, senha);
    response.status(200).json(profissionalLogado);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

profissionalRoute.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const profissionalController = new ProfissionalController();

    const profissional = await profissionalController.listar(Number(id));
    response.status(200).json(profissional);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export default profissionalRoute;

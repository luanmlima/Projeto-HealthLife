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
    if (profissionalCriado instanceof Error) {
      throw new Error(profissionalCriado.message);
    }
    response.json(profissionalCriado);
  } catch (error) {
    response.status(400).json({ message: error.message });
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
      especialidade
    } = request.body;

    const profissionalController = new ProfissionalController();

    if(especialidade){
      const profissionalAtualizado = await profissionalController.atualizar({
        id,
        especialidade,
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
      if (profissionalAtualizado instanceof Error) {
        throw new Error(profissionalAtualizado.message);
      }
      response.json(profissionalAtualizado);
      return;
    }

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
    if (profissionalAtualizado instanceof Error) {
      throw new Error(profissionalAtualizado.message);
    }
    response.json(profissionalAtualizado);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

profissionalRoute.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const profissionalController = new ProfissionalController();

    const profissionalDeletadoMessage = await profissionalController.deletar(
      Number(id),
    );
    if (profissionalDeletadoMessage instanceof Error) {
      throw new Error(profissionalDeletadoMessage.message);
    }
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
    if (profissionalLogado instanceof Error) {
      throw new Error(profissionalLogado.message);
    }

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
    if (profissional instanceof Error) {
      throw new Error(profissional.message);
    }
    response.status(200).json(profissional);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

profissionalRoute.get('/', async (request, response) => {
  try {
    const profissionalController = new ProfissionalController();
    const profissionais = await profissionalController.listarTodos();
    if (profissionais instanceof Error) {
      throw new Error(profissionais.message);
    }
    response.status(200).json(profissionais);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export default profissionalRoute;

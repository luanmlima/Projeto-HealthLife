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

// profissionalRoute.put('/atualizar', async (request, response) => {
//   try {
//     const { nome, id, idade } = request.body;

//     const pacienteController = new PacienteController();

//     const pacienteAtualizado = await pacienteController.atualizar({
//       nome,
//       id,
//       idade,
//     });
//     response.json(pacienteAtualizado);
//   } catch (error) {
//     response.json({ message: error.message });
//   }
// });

// profissionalRoute.delete('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const pacienteController = new PacienteController();

//     const pacienteDeletadoMessage = await pacienteController.deletar(
//       Number(id),
//     );
//     response.status(201).json(pacienteDeletadoMessage);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// });

// profissionalRoute.post('/', async (request, response) => {
//   try {
//     const { login, senha } = request.body;

//     const pacienteController = new PacienteController();

//     const pacienteLogado = await pacienteController.logar(login, senha);
//     response.status(200).json(pacienteLogado);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// });

// profissionalRoute.get('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const pacienteController = new PacienteController();

//     const paciente = await pacienteController.listar(Number(id));
//     response.status(200).json(paciente);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// });

export default profissionalRoute;
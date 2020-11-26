import express from 'express';
import pacienteRouter from './paciente.routes';
import profissionalRouter from './profissional.routes';
import agendamentoRouter from './agendamento.routes';

const router = express.Router();

router.use('/paciente', pacienteRouter);
router.use('/profissional', profissionalRouter);
router.use('/agendamento', agendamentoRouter);

export default router;

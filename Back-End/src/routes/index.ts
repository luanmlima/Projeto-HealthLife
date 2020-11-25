import express from 'express';
import pacienteRouter from './paciente.routes';
import profissionalRouter from './profissional.routes';

const router = express.Router();

router.use('/paciente', pacienteRouter);
router.use('/profissional', profissionalRouter);

export default router;

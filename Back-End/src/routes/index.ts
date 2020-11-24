import express from 'express';
import pacienteRouter from './paciente.routes';

const router = express.Router();

router.use('/paciente', pacienteRouter);

export default router;

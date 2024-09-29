import express, {Response} from 'express';
import { getAll } from '../services/diagnosesService';
import { Diagnoses } from '../types';
const router = express.Router();

router.get('/', (_req, res: Response<Diagnoses[]>) => {
    res.send(getAll());
});

export default router;
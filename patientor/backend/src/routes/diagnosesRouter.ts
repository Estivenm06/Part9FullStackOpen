import express, {Response} from 'express';
import { getAll } from '../services/diagnosesService';
import { Diagnosis } from '../types';
const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(getAll());
});

export default router;
import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

export const getAll = (): Diagnosis[] => {
    return diagnoses;
};
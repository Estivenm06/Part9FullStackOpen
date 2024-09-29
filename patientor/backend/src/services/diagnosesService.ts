import diagnoses from '../data/diagnoses';
import { Diagnoses } from '../types';

export const getAll = (): Diagnoses[] => {
    return diagnoses;
};
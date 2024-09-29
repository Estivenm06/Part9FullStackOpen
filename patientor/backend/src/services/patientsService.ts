import patients from "../data/patients";
import { PatientWithoutssn } from "../types";

export const getAllWithoutssn = (): PatientWithoutssn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

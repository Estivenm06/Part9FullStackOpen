import patients from "../data/patients";
import { NonSensitivePatient, NewPatient, patient } from "../types";
import {v1 as uuid} from 'uuid'
const id = uuid()

export const nonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const getPatient = (id: string): patient[] => {
  return patients.filter((p) => p.id === id)
}

export const addPatient = (entry: NewPatient): patient => {
  const newPatientEntry = {
    id: id,
    entries: [],
    ...entry
  } 
  patients.push(newPatientEntry)
  return newPatientEntry
}
import patients from "../data/patients";
import { PatientWithoutssn, NewPatient, Patient } from "../types";
import {v1 as uuid} from 'uuid'
const id = uuid()

export const getAllWithoutssn = (): PatientWithoutssn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: id,
    ...entry
  } 
  patients.push(newPatientEntry)
  return newPatientEntry
}
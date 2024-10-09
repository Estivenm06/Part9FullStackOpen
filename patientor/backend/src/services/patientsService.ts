import patients from "../data/patients";
import {
  NonSensitivePatient,
  NewPatient,
  patient,
  Diagnosis,
} from "../types";
import { v1 as uuid } from "uuid";
import { newEntry } from "../types";
import { Entry } from "../types";
const id = uuid();

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
  return patients.filter((p) => p.id === id);
};

export const addPatient = (entry: NewPatient): patient => {
  const newPatientEntry = {
    id: id,
    entries: [],
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export const createEntry = (entry: newEntry, id: string): Entry => {
  const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
    if (
      !object ||
      typeof object !== "object" ||
      !("diagnosisCodes" in object)
    ) {
      return [] as Array<Diagnosis["code"]>;
    }
    return object.diagnosisCodes as Array<Diagnosis["code"]>;
  };

  let diagnosisCodes = parseDiagnosisCodes(entry);
  const newEnt = {
    id: id,
    diagnosisCodes: diagnosisCodes,
    ...entry,
  };
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error(`Patient not found it`);
  }
  patient.entries.push(newEnt);
  return newEnt;
};

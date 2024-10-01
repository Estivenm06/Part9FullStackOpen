import { Gender, NewPatient } from "./types";

const parseName = (name: unknown): string => {
  if (!isString(name) || !isName(name)) {
    throw new Error("Incorrect or missing Name!");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing Date!");
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) {
    throw new Error("Incorrect or missing SSN!");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing Gender!");
  }
  return gender;
};

const parseOcuppation = (occupation: unknown): string => {
  if (!isString(occupation) || !isOcuppation(occupation)) {
    throw new Error("Incorrect or missin Ocuppation!");
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isName = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing data Name!");
  }
  return param;
};

const isDate = (param: string): Boolean => {
  return Boolean(Date.parse(param));
};

const isSSN = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missin data SSN!");
  }
  return param;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const isOcuppation = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing data Ocuppation!");
  }
  return param;
};

export const patientObject = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data!");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const patientObj: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOcuppation(object.occupation),
    };
    return patientObj;
  }
  throw new Error("Incorrect data: Some fields are missing!");
};

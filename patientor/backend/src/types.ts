import { z } from "zod";
import { patientObject } from "./utils";
export enum Gender {
  "Male" = "male",
  "Female" = "female",
  "Other" = "other",
}
export type Diagnoses = {
  code: string;
  name: string;
  latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Entry = {};

export type patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, "ssn" | 'entries'>;
export type NewPatient = z.infer<typeof patientObject>;
export interface Patient extends NewPatient {
  id: string;
}
//export type NewPatient = Omit<Patient, "id">;

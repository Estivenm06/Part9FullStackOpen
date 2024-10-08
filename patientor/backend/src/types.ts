import { z } from "zod";
import { patientObject } from "./utils";
export enum Gender {
  "Male" = "male",
  "Female" = "female",
  "Other" = "other",
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}
export type Diagnoses = {
  code: string;
  name: string;
  latin?: string;
};

type Discharge = {
  date: string;
  criteria: string;
}

type SickLeave = {
  startDate: string,
  endDate: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type BaseEntry = {
  id: string
  date: string
  specialist: string
  description: string
  diagnosisCodes?: Array<Diagnoses['code']>
};

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry 

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
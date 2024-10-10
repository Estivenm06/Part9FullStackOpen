import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";
export interface Diagnosis {
  map(arg0: (d: any) => any): any;
  code: string;
  name: string;
  latin?: string;
}

enum HealhCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseProps {
  date: Dayjs | null ;
  description: string;
  specialist: string;
  diagnosisCodes: string[];
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setdiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>
  submit: (event: React.SyntheticEvent) => void;
  diagnosesCode: Array<Diagnosis['code']>
  handleChange: (event: SelectChangeEvent<string[]>) => void

}

export interface NewEntryProp extends BaseProps {
  healthRating: string;
  setHealthRating: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  entryType: string;
  setEntryType: React.Dispatch<React.SetStateAction<string>>;
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickStart: string;
  setSickStart: React.Dispatch<React.SetStateAction<string>>;
  sickEnd: string;
  setSickEnd: React.Dispatch<React.SetStateAction<string>>;
}

export interface HealthProp extends BaseProps {
  healthRating: string;
  setHealthRating: React.Dispatch<React.SetStateAction<string>>;
}

export interface HospitalProps extends BaseProps {
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

export interface OccupationalForm extends BaseProps {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickStart: string;
  setSickStart: React.Dispatch<React.SetStateAction<string>>;
  sickEnd: string;
  setSickEnd: React.Dispatch<React.SetStateAction<string>>;
}

export type Discharge = {
  date: string;
  criteria: string;
};

export type SickLeave = {
  startDate: string;
  endDate: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type BaseEntry = {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
};

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealhCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type newEntry = UnionOmit<Entry, "id">;

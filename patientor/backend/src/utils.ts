import { z } from "zod";
import { Gender, NewPatient } from "./types";

export const patientObject = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
})

export const toNewPatient = (object: unknown): NewPatient => {
  return patientObject.parse(object)
};

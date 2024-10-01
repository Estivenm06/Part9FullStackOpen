import express, { Response } from "express";
import { getAllWithoutssn, addPatient } from "../services/patientsService";
import { PatientWithoutssn } from "../types";
import { patientObject } from "../utils";
const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutssn[]>) => {
  res.send(getAllWithoutssn());
});

router.post("/", (req, res) => {
  const body = req.body;
  try {
    const newPatient = patientObject(body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "something went wrong: ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

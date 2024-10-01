import express, { Response } from "express";
import { getAllWithoutssn, addPatient } from "../services/patientsService";
import { PatientWithoutssn } from "../types";
import { toNewPatient } from "../utils";
import { z } from "zod";
const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutssn[]>) => {
  res.send(getAllWithoutssn());
});

router.post("/", (req, res) => {
  const body = req.body;  
  try {
    const newPatient = toNewPatient(body);
    const addedPatient = addPatient(newPatient);
    console.log(addedPatient);
    
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;

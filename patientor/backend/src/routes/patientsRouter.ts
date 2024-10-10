import express, { Response } from "express";
import {
  nonSensitivePatient,
  addPatient,
  getPatient,
  createEntry,
} from "../services/patientsService";
import { NonSensitivePatient, Patient } from "../types";
import { toNewPatient } from "../utils";
import { z } from "zod";
const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(nonSensitivePatient());
});

router.get("/:id", (req, res: Response<Patient[]>) => {
  const id = req.params.id;
  res.send(getPatient(id));
});

router.post("/", (req, res) => {
  const body = req.body;
  try {
    const newPatient = toNewPatient(body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!body.date || !body.description || !body.specialist || !body.type) {
    res.status(400).send({ error: "Body empty or some values are missing!" });
  } else {
    const newEntry = createEntry(body, id);
    res.json(newEntry);
  }
});

export default router;

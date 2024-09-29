import express, {Response} from "express";
import { getAllWithoutssn } from "../services/patientsService";
import { PatientWithoutssn } from "../types";
const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutssn[]>) => {
  res.send(getAllWithoutssn());
});

export default router;

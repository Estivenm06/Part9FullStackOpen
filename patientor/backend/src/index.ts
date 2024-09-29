import express from "express";
import cors from 'cors'
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";
const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3001;

app.use("/api/ping", (_req, res) => {
  console.log("pinned");
  res.send("Pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

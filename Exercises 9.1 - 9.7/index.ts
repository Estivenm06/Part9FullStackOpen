import express from "express";
import bmiC from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  //console.log(!isNaN(height) || !isNaN(weight));

  if (!isNaN(height) || !isNaN(weight)) {
    const bmi = bmiC.calculateBmi(height, weight);
    res.send({
      weight,
      height,
      bmi,
    });
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const body = req.body;
  const target: number = body.target;
  const daily_exercises: number[] = body.daily_exercises;

  if (!target || !daily_exercises) {
    res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(target) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  try {
    const exercise = calculateExercises(daily_exercises, target);
    res.send({ exercise }).status(200);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
    res.status(400).send({ error: "something went wrong" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

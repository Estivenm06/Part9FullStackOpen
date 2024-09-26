import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  //console.log(!isNaN(height) || !isNaN(weight));

  if (!isNaN(height) || !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.send({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import { isNotNumber } from "./utils/helpers";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescripton: string;
  target: number;
  average: number;
}

export interface Numbers {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  value7: number;
  value8: number;
  value9: number;
}

const args = (args: string[]): Numbers => {
  if (args.length < 2) throw new Error("Numbers were not inserted!");
  if (args.length > 12) throw new Error("Too many arguments!");

  if (
    isNotNumber(args[3]) &&
    isNotNumber(args[4]) &&
    isNotNumber(args[5]) &&
    isNotNumber(args[6]) &&
    isNotNumber(args[7]) &&
    isNotNumber(args[8]) &&
    isNotNumber(args[9]) &&
    isNotNumber(args[10]) &&
    isNotNumber(args[11])
  ) {
    return {
      value1: Number(args[3]),
      value2: Number(args[4]),
      value3: Number(args[5]),
      value4: Number(args[6]),
      value5: Number(args[7]),
      value6: Number(args[8]),
      value7: Number(args[9]),
      value8: Number(args[10]),
      value9: Number(args[11]),
    };
  } else {
    throw new Error("Provided were not numbers!");
  }
};

export const calculateExercises = (
  dailyExercise: number[],
  target: number
): Result => {
  const days = new Map<string, number>();
  for (let i: number = 0; i <= dailyExercise.length - 1; i++) {
    days.set(`${i}`, dailyExercise[i]);
  }
  //console.log(days);
  let trainingDays: number = 0;
  let average: number = 0;
  let rating: number;
  let ratingDescripton: string;
  let periodLength = days.size

  for (const value of days.values()) {
    average += value;
    if (value > 0) {
      trainingDays += 1;
    }
  }
  average = average / days.size;
  const success: boolean = average >= target ? true : false;

  if (average < target) {
    rating = 1;
    ratingDescripton = "You can do it, keep working!";
  } else if (average === target) {
    rating = 2;
    ratingDescripton = "Well Done!";
  } else {
    rating = 3;
    ratingDescripton = "Excellent Work, You are the best!";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescripton,
    target,
    average,
  };
};

try {
  //console.log(process.argv);
  const target: number = Number(process.argv[2]);
  const {
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
  } = args(process.argv);
  console.log(
    calculateExercises(
      [value1, value2, value3, value4, value5, value6, value7, value8, value9],
      target
    )
  );
} catch (error) {
  let errorMessage = "Something bad happen: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

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

interface Numbers {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  value7: number;
  value8: number;
  value9: number;
  value10: number;
}

const args = (args: string[]): Numbers => {
  if (args.length < 2) throw new Error("Numbers were not inserted!");
  if (args.length > 12) throw new Error("Too many arguments!");

  if (
    isNotNumber(args[2]) &&
    isNotNumber(args[3]) &&
    isNotNumber(args[5]) &&
    isNotNumber(args[6]) &&
    isNotNumber(args[7]) &&
    isNotNumber(args[8]) &&
    isNotNumber(args[9]) &&
    isNotNumber(args[10]) &&
    isNotNumber(args[11])
  ) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      value3: Number(args[4]),
      value4: Number(args[5]),
      value5: Number(args[6]),
      value6: Number(args[7]),
      value7: Number(args[8]),
      value8: Number(args[9]),
      value9: Number(args[10]),
      value10: Number(args[11]),
    };
  } else {
    throw new Error("Provided were not numbers!");
  }
};

const calculateExercises = (
  dailyExercise: number[],
): Result => {
  const days = new Map<string, number>();
  const target = dailyExercise[0]
  for(let i: number = 1; i <= dailyExercise.length - 1; i++){
    days.set(`${i}`, dailyExercise[i])
  }
  //console.log(days);
  let daysTrained: number = 0;
  let average: number = 0;
  let rating: number;
  let ratingDescripton: string;
  
  for (let value of days.values()) {
    average += value;
    if (value > 0) {
      daysTrained += 1;
    }
  }
  average = average / days.size;
  let success: boolean = average >= target ? true : false;

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
    periodLength: days.size,
    trainingDays: daysTrained,
    success: success,
    rating: rating,
    ratingDescripton: ratingDescripton,
    target: target,
    average: average,
  };
};

try {
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
    value10,
  } = args(process.argv);
  console.log(
    calculateExercises(
      [
        value1,
        value2,
        value3,
        value4,
        value5,
        value6,
        value7,
        value8,
        value9,
        value10,
      ]
    )
  );
} catch (error) {
  let errorMessage = 'Something bad happen: '
  if(error instanceof Error){
    errorMessage += error.message
  }
  console.log(errorMessage);
  
}
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescripton: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercise: number[],
  target: number
): Result => {
  const days = new Map<string, number>();
  days.set("monday", dailyExercise[0]);
  days.set("tuesday", dailyExercise[1]);
  days.set("wednesday", dailyExercise[2]);
  days.set("thursday", dailyExercise[3]);
  days.set("friday", dailyExercise[4]);
  days.set("saturday", dailyExercise[5]);
  days.set("sunday", dailyExercise[6]);
  let daysTrained: number = 0;
  let average: number = 0;
  let rating: number;
  let ratingDescripton: string;
  for (let value of days.values()) {
    average += value;
    if (value > 0) {
      //daysTrained
      daysTrained += 1;
    }
  }
  //average
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
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error) {}

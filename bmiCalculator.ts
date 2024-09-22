interface Measures {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Measures => {
  if (args.length <= 2) throw new Error("Measures were not inserted!");
  if (args.length === 3) throw new Error("Only height was inserted!");
  if (args.length > 4) throw new Error("Too many arguments!");  

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (!(Number(args[2]) > 2) && !(Number(args[2]) < 0)) {
      throw new Error("Height has to be in centimeters");
    } else {
      return {
        height: Number(args[2]),
        weight: Number(args[3]),
      };
    }
  } else {
    throw new Error("Has to be numers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else if (bmi >= 30) {
    return "Obesity";
  }
};
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = "Something bad happen: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

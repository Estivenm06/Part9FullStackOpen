const calculateBmi = (height: number, weight: number) => {
  if (!(height >= 2) && !(height <= 1)) {
    return "Height has to be in centimeters";
  }
  if (!isNaN(height) && !isNaN(weight)) {
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
  } else {
    return "Can not calculate Bmi of string";
  }
};
console.log(calculateBmi(180, 74));

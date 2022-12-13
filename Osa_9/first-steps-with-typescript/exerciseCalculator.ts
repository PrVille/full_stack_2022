interface ResultObject {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface parsedExerciseArgs {
    days: Array<number>,
    target: number
}

const parseExerciseArguments = (args: Array<string>): parsedExerciseArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const filtered = [...args].filter(arg => !isNaN(Number(arg)));

  if (filtered.length > 1) {
    return {
      days: filtered.slice(1).map(Number),
      target: Number(filtered[0]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  days: Array<number>,
  target: number
): ResultObject => {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter((hours) => hours !== 0).length;
  const average: number = days.reduce((a, b) => a + b, 0) / periodLength;
  const success: boolean = average >= target; 

  let rating: number;
  let ratingDescription: string;

  if (average / target < 0.5) {
    rating = 1;
    ratingDescription = "try harder";
  } else if (average / target < 0.9) {
    rating = 2;
    ratingDescription = "could be better";
  } else {
    rating = 3;
    ratingDescription = "good job";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};


try {
    const { days, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(days, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

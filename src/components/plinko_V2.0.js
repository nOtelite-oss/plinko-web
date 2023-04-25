const startTime = performance.now();

const BOX_COUNT = 5; //How many boxes there will be. Note that if you give a value greater than 19 then ideal result is all 0. I dont know why.
const BALL_DROP = 150_000_000; //How many balls will be dropped
const SOLUTION_WAY = 1;
const processParts = 1000;

//If SOLUTION_WAY is set to 0, the simulation calculates the ball's fall pattern by randomly choosing whether each ball should go to the left or the right of the box.
//If SOLUTION_WAY is set to 1, the simulation calculates the ball's fall pattern using a Gaussian distribution based on the probability of each box. Note that this is faster.

// Factoriel Function
const factorial = (() => {
  const cache = { 0: 1, 1: 1 };
  const factorial = (n) => {
    if (n in cache) {
      return cache[n];
    }
    const result = n * factorial(n - 1);
    cache[n] = result;
    return result;
  };
  return factorial;
})();

// Combination Function
const combination = (() => {
  const cache = {};
  const memoized = (n, r) => {
    if (n === r || r === 0) {
      return 1;
    }
    if (cache[n]?.[r]) {
      return cache[n][r];
    }
    const result = memoized(n - 1, r - 1) + memoized(n - 1, r);
    if (!cache[n]) {
      cache[n] = {};
    }
    cache[n][r] = result;
    return result;
  };
  return memoized;
})();

//Calculating closest Ideal result to final result for comparing it with the final result
const idealResult = Array.from({ length: BOX_COUNT }, (e, i) =>
  combination(BOX_COUNT - 1, i)
);

const pascalTotal = idealResult.reduce((total, value) => total + value, 0);
const closestNumber = Math.round(BALL_DROP / pascalTotal);

const idealResultScaled = idealResult.map((value) => value * closestNumber);

//The function that simulates random ball behaviour
const LeftOrRight = (n) => {
  let sumNumber = 0;

  for (let i = 0; i < n; i++) {
    sumNumber += Math.random() >= 0.50001 ? 0.5 : -0.5;
  }

  return sumNumber;
};

//Final result function
const RandomBoxExperiment = () => {
  let sumBoxes = new Array(BOX_COUNT).fill(0);
  const middleBox = Math.ceil(BOX_COUNT / 2);

  if (BALL_DROP > 20000000) {
    let section = 0;
    console.log('Processing:');
    process.stdout.write('0%');

    if (SOLUTION_WAY === 0) {
      for (let i = 0; i < processParts; i++) {
        for (let i = 0; i < BALL_DROP / processParts; i++) {
          const whichBox =
            middleBox +
            ((BOX_COUNT & 1) === 0 ? 0.5 : 0) +
            LeftOrRight(BOX_COUNT - 1);
          sumBoxes[whichBox - 1] += 1;
        }

        section += 100 / processParts;
        process.stdout.write(` ${section}%`);
      }
    } else if (SOLUTION_WAY === 1) {
      const boxDropPossibilitys = [];
      for (let i = 0; i < BOX_COUNT; i++) {
        boxDropPossibilitys.push(idealResult[i] / pascalTotal);
      }

      for (let i = 0; i < processParts; i++) {
        for (let i = 0; i < BALL_DROP / processParts; i++) {
          let currentP = boxDropPossibilitys[0];
          let randomNumber = Math.random();

          for (let i = 0; i < BOX_COUNT; i++) {
            if (randomNumber < currentP) {
              sumBoxes[i] += 1;
              currentP = boxDropPossibilitys[0];
              randomNumber = Math.random();
              break;
            } else {
              currentP += boxDropPossibilitys[i + 1];
            }
          }
        }
        section += 100 / processParts;
        process.stdout.write(` ${section}%`);
      }
    }
  } else {
    if (SOLUTION_WAY === 0) {
      for (let i = 0; i < BALL_DROP; i++) {
        const whichBox =
          middleBox +
          ((BOX_COUNT & 1) === 0 ? 0.5 : 0) +
          LeftOrRight(BOX_COUNT - 1);
        sumBoxes[whichBox - 1] += 1;
      }
    } else if (SOLUTION_WAY === 1) {
      const boxDropPossibilitys = [];
      for (let i = 0; i < BOX_COUNT; i++) {
        boxDropPossibilitys.push(idealResult[i] / pascalTotal);
      }

      for (let i = 0; i < BALL_DROP; i++) {
        let currentP = boxDropPossibilitys[0];
        let randomNumber = Math.random();

        for (let i = 0; i < BOX_COUNT; i++) {
          if (randomNumber < currentP) {
            sumBoxes[i] += 1;
            currentP = boxDropPossibilitys[0];
            randomNumber = Math.random();
            break;
          } else {
            currentP += boxDropPossibilitys[i + 1];
          }
        }
      }
    }
  }
  return sumBoxes;
};

let finalResult = RandomBoxExperiment();

//Calculating the deflection
let sumDeflection = {};
for (let i = 0; i < BOX_COUNT; i++) {
  sumDeflection[i + 1] = Math.abs(
    (finalResult[i] * 100) / idealResultScaled[i] - 100
  );
}

const avarageDeflection =
  Object.values(sumDeflection).reduce((total, value) => total + value, 0) /
  Object.values(sumDeflection).length;

sumDeflection['Avarage Deflection'] = avarageDeflection;

const Log = (n) => console.log(n); //Console logs the argument

Log(' ');
Log('=======================================================START');

//Logg ing the results here:
Log('Box Count: ' + BOX_COUNT + ', Ball Count: ' + BALL_DROP);
Log(' ');

Log('Ideal Result: ');
Log(idealResultScaled); //This logs the ideal result
Log('Simulation Result: ');
Log(finalResult); //This logs the final result
Log('Deflection %: ');
Log(sumDeflection); //This logs the Deflection numbers
Log(' ');

const endTime = performance.now();
Log(`Calculation time: ${(endTime - startTime) / 1000} sec`);

Log('=======================================================END');

export default plinkoPrb;

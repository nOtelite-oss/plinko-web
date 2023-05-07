import { useState, useEffect } from 'react';

const Simulation = (props) => {
  const [sumBoxes, changeSumBoxes] = useState(['-']);
  const [idealResultScaled, changeIdealResultScaled] = useState(['-']);
  const [sumDeflection, changeDeflection] = useState(['-']);
  const [avarageDeflection, changeAvarageDeflection] = useState(0);

  const plinkoSim = (props) => {
    //* THE FUNCTIONS AND VARIBLES THAT PLINKO SIMULATION REQUIRES started
    //? Start values:
    const BOX_COUNT = parseInt(props.boxCount); //How many boxes there will be. Note that if you give a value greater than 19 then ideal result is all 0. I dont know why.
    const BALL_DROP = parseInt(props.ballCount); //How many balls will be dropped
    const processParts = 2000;

    const getResults = () => {
      console.log('getResults Function Worked');
      changeSumBoxes(sumBoxes);

      let sumDeflection = [];
      for (let i = 0; i < BOX_COUNT; i++) {
        sumDeflection[i] = Math.abs(
          (sumBoxes[i] * 100) / idealResultScaled[i] - 100
        );
      }
      changeDeflection(sumDeflection);

      const avarageDeflection =
        sumDeflection.reduce((total, value) => total + value, 0) /
        sumDeflection.length;

      changeAvarageDeflection(avarageDeflection);
    };
    //? Combination Function:
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

    //? Calculating closest Ideal result to final result for comparing it with the final result:
    const idealResult = Array.from({ length: BOX_COUNT }, (e, i) =>
      combination(BOX_COUNT - 1, i)
    );

    //? Calculating the pascal total and closest number to find ideal result scaled which is optimal result closest to simulation result:
    const pascalTotal = idealResult.reduce((total, value) => total + value, 0);
    const closestNumber = Math.round(BALL_DROP / pascalTotal);

    const idealResultScaled = idealResult.map((value) => value * closestNumber);

    changeIdealResultScaled(idealResultScaled);
    //* THE FUNCTIONS AND VARIBLES THAT PLINKO SIMULATION REQUIRES finished
    const sumBoxes = new Array(BOX_COUNT).fill(0);

    if (BALL_DROP > 20000000) {
      console.log('Processing:');

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
        getResults();
      }
    } else {
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
            break;
          } else {
            currentP += boxDropPossibilitys[i + 1];
          }
        }
      }
      getResults();
    }
  };

  useEffect(() => {
    const effectFunction = () => {
      plinkoSim(props);
    };

    effectFunction();
  }, [props]);

  useEffect(
    () =>
      console.log([
        sumBoxes,
        idealResultScaled,
        sumDeflection,
        avarageDeflection,
      ]),
    [sumBoxes, idealResultScaled, sumDeflection, avarageDeflection]
  );

  const sumResults = [
    ...sumBoxes,
    '--',
    ...idealResultScaled,
    '--',
    ...sumDeflection,
    '--',
    avarageDeflection,
  ];

  const mapResults = (item) => {
    if (item !== '--') {
      return <p style={{ display: 'flex' }}>{item}</p>;
    } else {
      return <p>{item}</p>;
    }
  };
  return <div>{sumResults.map(mapResults)}</div>;
};

export default Simulation;

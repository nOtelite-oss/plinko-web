import React, { useEffect, useState } from 'react';
import { round } from '../../utils/utils';
import Graph from './Graph';

export type SimulationType = {
  ballCount: number;
  boxCount: number;
  submitValue: number;
};

export const TO_FIXED_VAL = 1;

const Simulation = (props: SimulationType) => {
  const [sumBoxes, changeSumBoxes] = useState<number[]>([]);
  const [idealResultScaled, changeIdealResultScaled] = useState<number[]>([]);
  const [sumDeflection, changeDeflection] = useState<number[]>([]);
  const [avarageDeflection, changeAverageDeflection] = useState<number>(0);
  const [idealPascalTotal, changeIdealPascalTotal] = useState<number>(0);
  const [boxDropPossibilitys, setBoxDropPossibilitys] = useState<number[]>([]);

  const plinkoSim = (props: SimulationType) => {
    //* THE FUNCTIONS AND VARIBLES THAT PLINKO SIMULATION REQUIRES started
    //? Start values:
    const BOX_COUNT = props.boxCount; //How many boxes there will be. Note that if you give a value greater than 19 then ideal result is all 0. I dont know why.
    const BALL_DROP = props.ballCount; //How many balls will be dropped
    const processParts = 2000;

    const getResults = () => {
      changeSumBoxes(sumBoxes);

      let sumDeflection = [];
      for (let i = 0; i < BOX_COUNT; i++) {
        const def = Math.abs(
          (100 * (sumBoxes[i] - idealResultScaled[i])) / pascalTotalScaled
        );
        sumDeflection[i] = isNaN(def) ? 0 : def;
      }
      changeDeflection(sumDeflection);
      const avarageDeflection =
        sumDeflection.reduce((total, value) => total + value, 0) /
        sumDeflection.length;

      changeAverageDeflection(avarageDeflection);
    };
    //? Combination Function:
    const combination = (() => {
      const cache: Record<string, any> = {};
      const memoized = (n: number, r: number): number => {
        const nString = n.toString();
        if (n === r || r === 0) {
          return 1;
        }
        if (cache[nString]?.[r]) {
          return cache[nString][r];
        }
        const result = memoized(n - 1, r - 1) + memoized(n - 1, r);
        if (!cache[nString]) {
          cache[nString] = {};
        }
        cache[nString][r] = result;
        return result;
      };
      return memoized;
    })();

    //? Calculating closest Ideal result to final result for comparing it with the final result:
    const idealResult = Array.from({ length: BOX_COUNT }, (_e, i) =>
      combination(BOX_COUNT - 1, i)
    );

    //? Calculating the pascal total and closest number to find ideal result scaled which is optimal result closest to simulation result:
    const pascalTotal = idealResult.reduce((total, value) => total + value, 0);
    const closestNumber = BALL_DROP / pascalTotal;

    const calculateIdealResultScaled = () => {
      return idealResult
        .map((value) => value * closestNumber)
        .map((value) => round(value, TO_FIXED_VAL));
    };

    const calculatePascalTotalScaled = (): number => {
      let res: number;
      if (idealResult.map((value) => value * closestNumber)[0] === 0) {
        res = 0;
      } else {
        const idealResultScaledReduced = idealResultScaled.reduce(
          (total, value) => total + value,
          0
        );
        res = round(idealResultScaledReduced, TO_FIXED_VAL);
      }
      return res;
    };

    const idealResultScaled = calculateIdealResultScaled();
    const pascalTotalScaled = calculatePascalTotalScaled();

    changeIdealPascalTotal(pascalTotalScaled);

    changeIdealResultScaled(idealResultScaled);
    //* THE FUNCTIONS AND VARIBLES THAT PLINKO SIMULATION REQUIRES finished
    const sumBoxes = new Array(BOX_COUNT).fill(0);

    if (BALL_DROP > 20000000) {
      console.log('Processing:');

      const boxDropPossibilitys = [];
      for (let i = 0; i < BOX_COUNT; i++) {
        boxDropPossibilitys.push(idealResult[i] / pascalTotal);
      }

      setBoxDropPossibilitys(boxDropPossibilitys);

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

      setBoxDropPossibilitys(boxDropPossibilitys);

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

  return (
    <Graph
      sumBoxes={sumBoxes}
      pascalTotal={idealPascalTotal}
      idealResult={idealResultScaled}
      sumDeflection={sumDeflection}
      averageDeflection={avarageDeflection}
      boxDropPossibilitys={boxDropPossibilitys}
    />
  );
};

export default Simulation;

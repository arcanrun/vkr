//@flow

import brain from 'brain.js';

const trainingData = [
  {
    input: {
      'The US goverment sent his airplanes to the Afganistan': 1
    },
    output: {
      usa: 1
    }
  },
  {
    input: {
      'The Russian Federation sent ifantry to the west': 1
    },
    output: {
      rus: 1
    }
  },
  {
    input: {
      'The France foverment sent that the Paris is so good for tourists': 1
    },
    output: {
      fra: 1
    }
  },
  {
    input: {
      'The US goverment sent his airplanes to the Afganistan': 1
    },
    output: {
      to_afg: 1
    }
  },
  {
    input: {
      'The US goverment sent his airplanes to the Afganistan': 1
    },
    output: {
      airforce: 1
    }
  },
  {
    input: {
      'The US goverment sent its marine to the Afganistan': 1
    },
    output: {
      marine: 1
    }
  },
  {
    input: {
      'The US goverment sent its marine to the Afganistan': 1
    },
    output: {
      usa: 1
    }
  },
  {
    input: {
      'The US goverment sent its marine to the Afganistan': 1
    },
    output: {
      to_afg: 1
    }
  }
];

export const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);

export const netAnalyze = (text: string) => {
  return net.run({ [text]: 1 });
};

export const processNetAnalyze = (analyze: Object) => {};

function sortNerual(a, b) {
  if (a.value < b.value) return 1;
  if (a.value > b.value) return -1;
  if (a.value === b.value) return 0;
}

export function processNetAnalyzeMaxData(
  analyze: Object,
  sensMarine: number = 0.3,
  sensAirforce: number = 0.3,
  sensInfantry: number = 0.3,
  sensWho: number = 0.3,
  sensWhere: number = 0.3
) {
  console.log('------');
  let res = {};
  const what = [];
  const who = [];
  const where = [];
  for (let key in analyze) {
    const value = +analyze[key];
    console.log(key, ': ', value);
    if (key === 'marine' && value >= sensMarine) {
      what.push({ name: key, value });
    }
    if (key === 'airforce' && value >= sensAirforce) {
      what.push({ name: key, value });
    }
    if (key === 'infantry' && value >= sensInfantry) {
      what.push({ name: key, value });
    }
    if (key.includes('to_') && value >= sensWhere) {
      where.push({ name: key, value });
    }
    if (
      key !== 'marine' &&
      key !== 'airforce' &&
      key !== 'infantry' &&
      !key.includes('to_') &&
      value >= sensWho
    ) {
      who.push({ name: key, value });
    }
  }
  what.sort(sortNerual);
  where.sort(sortNerual);
  who.sort(sortNerual);
  const resArr = [...what, ...where, ...who];
  resArr.forEach(el => {
    res[el.name] = el.value;
  });
  console.log('res:', res);
  return res;
}

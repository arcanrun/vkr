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
  }
];

export const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);

export const netAnalyze = (text: string) => {
  return net.run({ [text]: 1 });
};

export const processNetAnalyze = (analyze: Object) => {};

export const processNetAnalyzeMaxData = (
  analyze: Object,
  sensivity: number
) => {
  let res = {};
  for (let key in analyze) {
    const value = analyze[key];
    console.log(value);
    if (value >= sensivity) {
      res[key] = value;
    }
  }
  return res;
};

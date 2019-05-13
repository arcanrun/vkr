//@flow

export const changeSettingsNeuralnet = (
  sensWho: number,
  sensWhere: number,
  sensAirforce: number,
  sensMarine: number,
  sensInfantry: number
) => ({
  type: 'CHANGE_SETTINGS_NEURAL_NET',
  payload: {
    sensWho,
    sensWhere,
    sensAirforce,
    sensMarine,
    sensInfantry
  }
});

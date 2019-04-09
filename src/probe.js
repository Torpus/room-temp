const axios = require('axios');
const dataFile = require('../resources/data.json');
const db = require('./db');

function parseUId(data, key) {
  return data[key].uniqueid.split('-')[0];
}

function getTemps() {
  axios.get(dataFile.hueUrl).then((response) => {
    const hueSensor = {};
    const { data } = response;
    Object.keys(data).forEach((key) => {
      if (data[key].type === 'ZLLTemperature') {
        const uId = parseUId(data, key);
        Object.keys(data).forEach((parentSensorKey) => {
          if (data[parentSensorKey].type === 'ZLLPresence' && parseUId(data, parentSensorKey) === uId) {
            hueSensor[uId] = [
              data[parentSensorKey].name,
              data[key].state.temperature,
            ];
          }
        });
      }
    });
    Object.keys(hueSensor).forEach((key) => {
      let tempC = hueSensor[key][1].toString();
      tempC = `${tempC.substring(0, 2)}.${tempC.substring(2, 4)}C`;
      db(hueSensor[key][0], tempC);
    });
  }).catch((error) => {
    console.log(error);
  });
}

module.exports = getTemps;

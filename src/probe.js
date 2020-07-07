const axios = require('axios');
const dataFile = require('../resources/data.js');
// const convert = require('./convert.js');

function parseUId(data, key) {
  return data[key].uniqueid.split('-')[0];
}

function getSensors(data) {
  const hueSensor = {};
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
  return hueSensor;
}

function getTemps() {
  const temps = axios.get(dataFile.hueUrl).then((response) => {
    const tempList = {};
    const { data } = response;
    const hueSensor = getSensors(data);
    Object.keys(hueSensor).forEach((key) => {
      let tempF = hueSensor[key][1].toString();
      tempF = `${tempF.substring(0, 2)}.${tempF.substring(2, 4)}`;
      // tempList[hueSensor[key][0]] = convert(tempC);
      tempList[hueSensor[key][0]] = tempF;
    });
    return tempList;
  }).catch((error) => {
    console.log(error);
  });
  return temps;
}

module.exports = {
  getTemps,
  parseUId,
  getSensors,
};

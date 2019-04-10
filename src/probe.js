const axios = require('axios');
const dataFile = require('../resources/data.js');

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
      let tempC = hueSensor[key][1].toString();
      tempC = `${tempC.substring(0, 2)}.${tempC.substring(2, 4)}C`;
      tempList[hueSensor[key][0]] = tempC;
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

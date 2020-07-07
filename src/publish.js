const mqtt = require('mqtt');
const dataFile = require('../resources/data.js');

const client = mqtt.connect(dataFile.mqttUrl);

module.exports = function insert(roomName, tempF) {
  const pub = `{"temperature":${tempF}}`;
  client.publish(`sensors/temp/${roomName.replace(/ /g, '_')}`, `${pub}`);
  console.log(`${roomName}: ${tempF}`);
};

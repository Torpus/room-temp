const mqtt = require('mqtt');
const dataFile = require('../resources/data.js')
const client = mqtt.connect(dataFile.mqttUrl)

module.exports = function insert(roomName, tempF) {
  pub = `{"temperature":${tempF.toFixed(2)}}`
  client.publish(`sensors/temp/${roomName.replace(/ /g,"_")}`, `${pub}`);
};

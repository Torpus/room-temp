const HUE_IP_ADDR = process.env.HUE_IP_ADDR;
const HUE_API_KEY = process.env.HUE_API_KEY;
const MQTT_IP_ADDR = process.env.MQTT_IP_ADDR;

module.exports = {
  hueUrl: `http://${HUE_IP_ADDR}/api/${HUE_API_KEY}/sensors`,
  mqttUrl: `mqtt://${MQTT_IP_ADDR}:1883`,
};

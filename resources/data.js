const {
  HUE_IP_ADDR,
  HUE_API_KEY,
  MQTT_IP_ADDR,
  PROM_IP_ADDR,
} = process.env;

module.exports = {
  hueUrl: `http://${HUE_IP_ADDR}/api/${HUE_API_KEY}/sensors`,
  mqttUrl: `mqtt://${MQTT_IP_ADDR}:1883`,
  promUrl: `http://${PROM_IP_ADDR}:9090`,
};

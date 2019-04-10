const HUE_IP_ADDR = process.env.HUE_IP_ADDR;
const HUE_API_KEY = process.env.HUE_API_KEY;

module.exports = {
  hueUrl: `http://${HUE_IP_ADDR}/api/${HUE_API_KEY}/sensors`,
};

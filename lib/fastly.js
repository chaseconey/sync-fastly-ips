const axios = require("axios").default;

/**
 * Grab IPs from https://api.fastly.com/public-ip-list
 */
module.exports.getFastlyIps = async function() {
  let response = await axios.get("https://api.fastly.com/public-ip-list");

  return response.data.addresses;
};

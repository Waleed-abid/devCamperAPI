const NodeGeoCoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "KKY0lxpJsgIvUbD2ToS6vipfp5MuJawD",
  formatter: null,
};

const geocoder = NodeGeoCoder(options);

module.exports = geocoder;

var config = {};

config.mongoURI = {
  development: process.env.DEV_DB,
  test: process.env.TEST_DB,
  production: process.env.PROD_DB
};

module.exports = config;

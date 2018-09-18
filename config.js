// setting up environments for staging and production
var environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging'
};

environments.production = {
    port: 5000,
    envName: 'production'
};

var currentEnv = typeof(process.env.ENV) == 'string' ? process.env.ENV.toLowerCase() : '';

var exportedEnv = typeof environments[currentEnv] == 'object' ? environments[currentEnv] : environments.staging;

module.exports = exportedEnv;

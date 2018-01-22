const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) =>
  console.log(process.env.PUBLIC_URL) ||
  awsServerlessExpress.proxy(server, event, context);
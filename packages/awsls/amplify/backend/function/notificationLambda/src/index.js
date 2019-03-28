exports.handler = function (event, context) { //eslint-disable-line
  console.log(`event = ${event}`);
  context.done(null, 'Hello World'); // SUCCESS with message
};

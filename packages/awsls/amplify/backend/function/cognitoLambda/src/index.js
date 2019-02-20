const preSignUp = require('./preSignUp');
const postSignUp = require('./postSignUp');

exports.handler = function (event, context, callback) {
  console.log("1. Event Passed - ", event);

  console.log("2. Trigger Source", event.triggerSource);
  if (event.triggerSource == "PreSignUp_SignUp") {
    preSignUp(event, context, callback);
  }
  else if (event.triggerSource == "PostConfirmation_ConfirmSignUp") {
    postSignUp(event, context, callback);
  }
};
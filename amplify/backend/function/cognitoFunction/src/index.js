const
  aws = require('aws-sdk'),
  uuidv4 = require('uuid/v4');

const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });

exports.handler = function (event, context, callback) {
  var d = new Date();
  var id = uuidv4();
  console.log("Logging - ", event);
  var paramsUsuarios = {
    TableName: 'User-ew2bghmyzvcktaphwwjm4kxbeu-local',
    Item: {
      "id": { "S": id },
      "cvReviewsTaken": { "N": "0" },
      "email": { "S": event.request.userAttributes.email },
      "phone_number": { "S": event.request.userAttributes.phone_number },
      "username": { "S": event.userName }
    }
  };
  ddb.putItem(paramsUsuarios, function (err, data) {
    if (err) {
      console.log("Error", err);
      callback(null, event);
    } else {
      console.log("Exit", data);
      callback(null, event);
    }
  });
};
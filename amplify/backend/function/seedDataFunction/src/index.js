const
  aws = require('aws-sdk'),
  uuidv4 = require('uuid/v4');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
exports.handler = function (event, context, callback) {
  var params = {
    RequestItems: {
      "pricingPlans-ew2bghmyzvcktaphwwjm4kxbeu-local": [
        {
          PutRequest: {
            Item: {
              "id": { "S": uuidv4() },
              "name": { "S": "Free" },
              "cvReviewsAllowed": { "N": "3" },
              "price": { "N": "0" },
              "weightage": { "N": "0" },
            }
          }
        },
        {
          PutRequest: {
            Item: {
              "id": { "S": uuidv4() },
              "name": { "S": "Pro" },
              "cvReviewsAllowed": { "N": "10" },
              "price": { "N": "1000" },
              "weightage": { "N": "1" },
            }
          }
        }
      ]
    }
  };

  ddb.batchWriteItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      callback(null, event);
    } else {
      console.log("Success", data);
      callback(null, event);
    }
  });
};
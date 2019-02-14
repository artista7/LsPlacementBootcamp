const
  aws = require('aws-sdk'),
  uuidv4 = require('uuid/v4');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
exports.handler = function (event, context, callback) {
  var params = {
    RequestItems: {
      "PricingPlan-ya5pnukycbhtve3t452za5wjjq-local": [
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
      ],
      "ServiceEnabled-ya5pnukycbhtve3t452za5wjjq-local": [
        {
          PutRequest: {
            Item: {
              "id": { "S": uuidv4() },
              "name": { "S": "signUp" },
              "isEnabled": { "BOOL": true }
            }
          }
        },
        {
          PutRequest: {
            Item: {
              "id": { "S": uuidv4() },
              "name": { "S": "cvReview" },
              "isEnabled": { "BOOL": true }
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
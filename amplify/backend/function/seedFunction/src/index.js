const aws = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
const graphqlApiId = process.env.GraphQLApiId;
const env = process.env.ENV;
exports.handler = function (event, context, callback) {
  //getting table names from environment variables
  const PricingPlanTableName = "PricingPlan-" + graphqlApiId + "-" + env;
  const ServiceEnabledTableName = "ServiceEnabled-" + graphqlApiId + "-" + env;

  console.log("Pricing table name is - " + PricingPlanTableName);
  console.log("ServiceEnabled table name is - " + ServiceEnabledTableName);

  //creating params object for db entry
  var params = {
    RequestItems: {
      [PricingPlanTableName]: [
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
      [ServiceEnabledTableName]: [
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

  //Batch writing to ddb
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
const aws = require('aws-sdk');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
const graphqlApiId = process.env.GraphQLApiId;
const env = process.env.ENV;

exports.handler = function (event, context, callback) {
  console.log("Event Passed - ", event);
  //getting table names from environment variables
  const PricingPlanTableName = "PricingPlan-" + graphqlApiId + "-" + env;
  const UserTableName = "User-" + graphqlApiId + "-" + env;

  console.log("Pricing table name is - " + PricingPlanTableName);
  console.log("User table name is - " + UserTableName);

  var params = {
    ExpressionAttributeValues: {
      ':n': { S: 'Free' }
    },
    ProjectionExpression: 'id',
    ExpressionAttributeNames: { "#n": "name" },
    FilterExpression: 'contains (#n, :n)',
    TableName: PricingPlanTableName
  };

  //1. get id of free plan
  ddb.scan(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      var id = data.Items[0].id.S;
      console.log("Successfully fetched Free plan's id - ", id);
      //2. insert id into created users
      insertUserInDb(id);
    }
  });

  function insertUserInDb(id) {
    var paramsUser = {
      TableName: UserTableName,
      Item: {
        "id": { "S": event.userName },
        "cvReviewsTaken": { "N": "0" },
        "email": { "S": event.request.userAttributes.email },
        "phone_number": { "S": event.request.userAttributes.phone_number },
        "pricingPlanId": { "S": id },
        "username": { "S": event.userName }
      }
    };
    ddb.putItem(paramsUser, function (err, data) {
      if (err) {
        console.log("Error", err);
        callback(null, event);
      } else {
        console.log("Successfully Inserted user", data);
        callback(null, event);
      }
    });
  }
};
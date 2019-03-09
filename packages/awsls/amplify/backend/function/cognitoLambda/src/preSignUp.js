const aws = require('aws-sdk');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
const graphqlApiId = process.env.GraphQLApiId;
const env = process.env.ENV;

module.exports = function preSignUp(event, context, callback) {
    //get college from from collegePasscode
    const CollegeTableName = "College-" + graphqlApiId + "-" + env;
    const collegePasscode = event.request.userAttributes['custom:collegePasscode'];

    var params = {
        ExpressionAttributeValues: {
            ':sp': { S: collegePasscode }
        },
        ExpressionAttributeNames: { "#n": "name" },
        ProjectionExpression: '#n, collegePasscode',
        FilterExpression: 'collegePasscode = :sp',
        TableName: CollegeTableName
    };

    console.log("3. College table scan params - ", params);

    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            callback(err, event);
        } else {
            //if college present addcollege id to new user object
            if (data.Items.length > 0) {
                console.log("4. Success college name", data.Items[0]);
                callback(null, event);
            }
            //else do not allow user signUp
            else {
                var error = new Error("College passcode cannot be verified");
                // Return error to Amazon Cognito
                callback(error, event);
            }
        }
    });



}
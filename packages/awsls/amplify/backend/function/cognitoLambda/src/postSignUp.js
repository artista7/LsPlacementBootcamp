const aws = require('aws-sdk');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
const graphqlApiId = process.env.GraphQLApiId;
const env = process.env.ENV;

module.exports = async function postSignUp(event, context, callback) {
    //getting table names from environment variables
    const PricingPlanTableName = "PricingPlan-" + graphqlApiId + "-" + env;
    const UserTableName = "User-" + graphqlApiId + "-" + env;
    const CollegeTableName = "College-" + graphqlApiId + "-" + env;

    console.log("3. Pricing table name is - " + PricingPlanTableName);
    console.log("4. User table name is - " + UserTableName);
    console.log("5. College table name is - " + CollegeTableName);

    //getting college passcode and group
    const collegePasscode = event.request.userAttributes['custom:collegePasscode'];
    const group = event.request.userAttributes['custom:addToGroup'];

    var paramsFreePlan = {
        ExpressionAttributeValues: {
            ':n': { S: 'Free' }
        },
        ProjectionExpression: 'id',
        ExpressionAttributeNames: { "#n": "name" },
        FilterExpression: 'contains (#n, :n)',
        TableName: PricingPlanTableName
    };

    var paramsCollegeName = {
        ExpressionAttributeValues: {
            ':sp': { S: collegePasscode }
        },
        ExpressionAttributeNames: { "#n": "name" },
        ProjectionExpression: '#n, collegePasscode',
        FilterExpression: 'contains (collegePasscode, :sp)',
        TableName: CollegeTableName
    };

    //1. get id of free plan
    ddb.scan(paramsFreePlan, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            var id = data.Items[0].id.S;
            console.log("Successfully fetched Free plan's id - ", id);

            //get collegename
            ddb.scan(paramsCollegeName, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    callback(err, event);
                } else {
                    //if college present addcollege id to new user object
                    if (data.Items.length > 0) {
                        console.log("4. Success college name", data.Items[0]);
                        var collegeName = data.Items[0].name.S;
                        //2. insert id into created users
                        insertUserInDb(id, collegeName);
                    }
                    //else do not allow user signUp
                    else {
                        insertUserInDb(id, "collegeNotFound");
                    }
                }
            });
        }
    });

    function insertUserInDb(id, collegeName) {
        console.log("id and collegeName are - ", id, " ", collegeName);
        var paramsUser = {
            TableName: UserTableName,
            Item: {
                "id": { "S": event.userName },
                "collegeName": { "S": collegeName },
                "cvReviewsTaken": { "N": "0" },
                "email": { "S": event.request.userAttributes.email },
                "group": { "S": group },
                "phone_number": { "S": event.request.userAttributes.phone_number },
                "pricingPlanId": { "S": id },
                "username": { "S": event.userName }
            }
        };
        ddb.putItem(paramsUser, function (err, data) {
            if (err) {
                console.log("Error", err);
                callback(err, event);
            } else {
                console.log("Successfully Inserted user", data);
                callback(null, event);
            }
        });
    }
}
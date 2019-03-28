const aws = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const ddb = new aws.DynamoDB({ apiVersion: '2012-10-08' });
const graphqlApiId = process.env.GraphQLApiId;
const env = process.env.ENV;

// function formatImage(image) {
//   return {
//     createdAt: image.createdAt != undefined ? image.createdAt.S : new Date().toISOString(),
//     lastUpdatedBy: image.lastUpdatedBy != undefined ? image.lastUpdatedBy.S : "",
//     fileName: image.fileName != undefined ? image.fileName.S : "",
//     createdBy: image.createdBy != undefined ? image.createdBy.S : "",
//     id: image.id != undefined ? image.id.S : "",
//     updatedAt: image.updatedAt != undefined ? image.updatedAt.S : "",
//     comments: image.comments != undefined ? image.comments.S : "",
//     reviewedBy: image.reviewedBy != undefined ? image.reviewedBy.S : ""
//   }
// }

exports.handler = function (event, context, callback) { //eslint-disable-line
  //logging event
  console.log(`event = ${event}`);

  //getting table names from environment variables
  const NotificationTableName = "Notification-" + graphqlApiId + "-" + env;

  //logging table name
  console.log("Notification Table Name is - " + NotificationTableName);

  //make put item from event
  var insertParams = {
    RequestItems: {
      [NotificationTableName]: event.Records.map(record => {
        var targetGroup;
        var data;
        var desc;
        if (record.eventName.toLowerCase() == 'insert') {
          targetGroup = "admin";
          desc = `New CV recieved for review`;
          data = {
            "M": {
              "id": { "S": record.dynamodb.NewImage.id.S },
              "createdBy": { "S": record.dynamodb.NewImage.createdBy.S },
              "fileName": { "S": record.dynamodb.NewImage.fileName.S }
            }
          }
        }
        else if (record.eventName.toLowerCase() == 'modify') {
          //if from submitted to underReview
          if (record.dynamodb.NewImage.status.S == 'underReview' && record.dynamodb.OldImage.status.S == 'submitted') {
            targetGroup = "student";
            desc = `Your CV is under review`;
            data = {
              "M": {
                "id": { "S": record.dynamodb.NewImage.id.S },
                "createdBy": { "S": record.dynamodb.NewImage.createdBy.S },
                "fileName": { "S": record.dynamodb.NewImage.fileName.S },
                "reviewedBy": { "S": record.dynamodb.NewImage.reviewedBy.S }
              }
            }
          }
          //if first comment added
          else if ((record.dynamodb.OldImage.comments == undefined && record.dynamodb.NewImage.comments != undefined) || (record.dynamodb.OldImage.comments != record.dynamodb.NewImage.comments)) {
            targetGroup = "student";
            desc = `New Comments added to your CV`;
            data = {
              "M": {
                "id": { "S": record.dynamodb.NewImage.id.S },
                "createdBy": { "S": record.dynamodb.NewImage.createdBy.S },
                "fileName": { "S": record.dynamodb.NewImage.fileName.S },
                "reviewedBy": { "S": record.dynamodb.NewImage.reviewedBy.S }
              }
            }
          }
        }

        return {
          PutRequest: {
            Item: {
              "id": { "S": uuidv4() },
              "createdAt": { "S": new Date(record.dynamodb.ApproximateCreationDateTime).toISOString() },
              "desc": { "S": desc },
              "eventID": { "S": record.eventID },
              "eventName": { "S": record.eventName },
              "targetGroup": { "S": targetGroup },
              "data": data
            }
          }
        }
      })
    }
  };

  console.log('5. insert Params - ', insertParams.RequestItems[NotificationTableName][0].PutRequest);

  //Batch writing to ddb
  ddb.batchWriteItem(insertParams, function (err, data) {
    if (err) {
      console.log("Error", err);
      callback(null, event);
    } else {
      console.log("Success", data);
      callback(null, event);
    }
  });
};
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
   DeleteCommand,
   DynamoDBDocumentClient,
   GetCommand,
   PutCommand,
   QueryCommand,
} = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');
const uuidv1 = require('uuid').v1;

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = 'groups';
if (process.env.ENV && process.env.ENV !== 'NONE') {
   tableName = tableName + '-' + process.env.ENV;
}

const partitionKeyName = 'guid';
const partitionKeyType = 'S';
const sortKeyName = '';
const sortKeyType = '';
const hasSortKey = sortKeyName !== '';
const path = '/groups';
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', '*');
   next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
   switch (type) {
      case 'N':
         return Number.parseInt(param);
      default:
         return param;
   }
};

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + hashKeyPath, async function (req, res) {
   const params = {};
   params[partitionKeyName] = req.params[partitionKeyName];

   let queryParams = {
      TableName: tableName,
      KeyConditionExpression: `${partitionKeyName} = :value`,
      ExpressionAttributeValues: {
         ':value': req.params[partitionKeyName],
      },
   };

   try {
      const data = await ddbDocClient.send(new QueryCommand(queryParams));
      res.json(data.Items);
   } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
   }
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + hashKeyPath, async function (req, res) {
   const params = {};
   if (req.apiGateway) {
      params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
   } else {
      params[partitionKeyName] = req.params[partitionKeyName];
      try {
         params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
      } catch (err) {
         res.statusCode = 500;
         res.json({ error: 'Wrong column type ' + err });
      }
   }

   let getItemParams = {
      TableName: tableName,
      Key: params,
   };

   try {
      const data = await ddbDocClient.send(new GetCommand(getItemParams));
      if (data.Item) {
         res.json(data.Item);
      } else {
         res.json(data);
      }
   } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
   }
});

/************************************
 * HTTP put method for adding expense to the group *
 *************************************/
app.put(`${path}${hashKeyPath}/expenses`, async function (req, res) {
   const guid = req.params[partitionKeyName];
   const { expenses } = req.body;

   if (expenses === null || expenses === undefined || !expenses.payer || !expenses.amount) {
      res.statusCode = 400;
      res.json({ error: 'Invalid expense object' });
      return;
   }

   let putItemParams = {
      TableName: tableName,
      Item: {
         [partitionKeyName]: guid,
         expenses: expenses,
      },
   };

   try {
      let data = await ddbDocClient.send(new PutCommand(putItemParams));
      res.json({ success: 'put call succeed!', url: req.url, data: data });
   } catch (err) {
      res.statusCode = 500;
      res.json({ error: err });
   }
});

/************************************
 * HTTP put method for adding members to the group *
 *************************************/

app.put(`${path}${hashKeyPath}/members`, async function (req, res) {
   const guid = req.params[partitionKeyName];
   const { members } = req.body;

   if (members === null || members === undefined || !Array.isArray(members) || members.length === 0) {
      res.statusCode = 400;
      res.json({ error: 'invalid members' });
      return;
   }

   let putItemParams = {
      TableName: tableName,
      Item: {
         [partitionKeyName]: guid,
         members: members,
      },
   };
   try {
      let data = await ddbDocClient.send(new PutCommand(putItemParams));
      res.json({ success: 'put call succeed!', url: req.url, data: data });
   } catch (err) {
      res.statusCode = 500;
      res.json({ error: err });
   }
});
/************************************
 * HTTP post method for insert object * - create gourp
 *************************************/

app.post(path, async function (req, res) {
   const { groupName } = req.body;
   const guid = uuidv1();

   if (groupName === null || groupName === undefined || groupName.trim().length === 0) {
      res.statusCode = 400;
      res.json({ error: 'invalida group' });
      return;
   }

   let putItemParams = {
      TableName: tableName,
      Item: {
         groupName: groupName,
         guid: guid,
      },
   };
   try {
      let data = await ddbDocClient.send(new PutCommand(putItemParams));
      res.json({ success: 'post call succeed!', url: req.url, data: data });
   } catch (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
   }
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, async function (req, res) {
   const params = {};
   if (req.apiGateway) {
      params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
   } else {
      params[partitionKeyName] = req.params[partitionKeyName];
      try {
         params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
      } catch (err) {
         res.statusCode = 500;
         res.json({ error: 'Wrong column type ' + err });
      }
   }
   if (hasSortKey) {
      try {
         params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
      } catch (err) {
         res.statusCode = 500;
         res.json({ error: 'Wrong column type ' + err });
      }
   }

   let removeItemParams = {
      TableName: tableName,
      Key: params,
   };

   try {
      let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
      res.json({ url: req.url, data: data });
   } catch (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url });
   }
});

app.listen(3000, function () {
   console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;

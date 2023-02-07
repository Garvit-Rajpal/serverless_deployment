"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const fetch_task = async (event) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  let task;

  try{
  const result = await dynamoDb.scan({
    TableName: "work"
  }).promise();
  task = result.Items;
  }catch(err){
    console.log(err);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(task),
    };
};

module.exports = {
    handler: fetch_task,
};
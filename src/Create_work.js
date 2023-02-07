"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const insert_task = async (event) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { task } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();
  const newTask = {
    id,
    task,
    createdAt,
    completed: false
  }
  await dynamoDb.put({
    TableName: "work",
    Item: newTask
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
    };
};

module.exports = {
    handler: insert_task,
};
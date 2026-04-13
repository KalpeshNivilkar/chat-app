const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

const dynamodb = new AWS.DynamoDB.DocumentClient()
const connectionsTable = process.env.CONNECTIONS_TABLE_NAME
const messagesTable = process.env.DYNAMODB_TABLE_NAME

// Store connection mapping: connectionId -> userId
const connections = new Map()

exports.connect = async (event) => {
  const connectionId = event.requestContext.connectionId
  
  // Extract userId from query string
  const userId = event.queryStringParameters?.userId
  
  await dynamodb.put({
    TableName: connectionsTable,
    Item: { connectionId, userId: userId || 'anonymous' }
  }).promise()
  
  connections.set(connectionId, userId)
  
  // Broadcast online status
  const response = {
    statusCode: 200,
    body: JSON.stringify({ connectionId, message: 'Connected' })
  }
  
  return response
}

exports.disconnect = async (event) => {
  const connectionId = event.requestContext.connectionId
  
  await dynamodb.delete({
    TableName: connectionsTable,
    Key: { connectionId }
  }).promise()
  
  connections.delete(connectionId)
  
  return { statusCode: 200 }
}

exports.sendMessage = async (event) => {
  const connectionId = event.requestContext.connectionId
  const body = JSON.parse(event.body)
  
  const { chatId, content, userId, userName } = body
  const timestamp = Date.now()
  const messageId = uuidv4()
  
  // Store message in DynamoDB
  await dynamodb.put({
    TableName: messagesTable,
    Item: {
      chatId,
      timestamp,
      id: messageId,
      userId,
      userName,
      content,
      status: 'sent'
    }
  }).promise()
  
  // Broadcast to all connections in chat (simplified: broadcast to all)
  const sendParams = {
    Data: JSON.stringify({
      type: 'message',
      data: {
        id: messageId,
        chatId,
        userId,
        userName,
        content,
        timestamp,
        status: 'delivered'
      }
    })
  }
  
  // Send to all active connections
  for (let [connId] of connections.entries()) {
    try {
      await dynamodb.update({
        TableName: connectionsTable,
        Key: { connectionId: connId },
        UpdateExpression: 'SET lastActivity = :ts',
        ExpressionAttributeValues: { ':ts': timestamp }
      }).promise()
      
      // In real app, use API Gateway Management API to send
      console.log(`Message sent to ${connId}`)
    } catch (err) {
      console.error('Failed to send to connection:', err)
      connections.delete(connId)
    }
  }
  
  return { statusCode: 200 }
}


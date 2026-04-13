# Real-Time Chat Application (WhatsApp Clone)

## Overview
Full-stack real-time chat app using serverless architecture:
- **Frontend**: React + Tailwind CSS (deployed on Vercel)
- **Backend**: AWS Lambda + API Gateway WebSockets + DynamoDB
- **Real-time**: WebSocket connections for messaging
- **Database**: DynamoDB for message storage and user status

## Project Structure
```
chat-app/
├── frontend/           # React app
├── backend/            # AWS Lambda functions
├── infrastructure/     # AWS CDK/Serverless Framework
└── README.md
```

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend (Local Testing)
```bash
cd backend
npm install
npm run dev  # Uses LocalStack for local AWS simulation
```

## AWS Setup
1. Install AWS CLI and configure credentials
2. Install Serverless Framework: `npm i -g serverless`
3. Deploy backend: `cd backend && serverless deploy`

## Environment Variables
Create `.env` files:
```
# Frontend (.env.local)
VITE_WS_URL=wss://your-api-gateway.execute-api.region.amazonaws.com/prod
VITE_API_URL=https://your-api-gateway.execute-api.region.amazonaws.com/prod

# Backend (.env)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
DYNAMODB_TABLE_NAME=ChatMessages
```

## Features Implemented
- ✅ Real-time messaging via WebSockets
- ✅ Online/offline user status
- ✅ Chat history persistence
- ✅ Typing indicators
- ✅ Message status (sent/delivered)
- ✅ Responsive WhatsApp-like UI
- ✅ Group chat support
- ✅ Emoji support

## Deployment
1. **Frontend**: `cd frontend && vercel --prod`
2. **Backend**: `cd backend && serverless deploy --stage prod`

## AWS Resources Created
- API Gateway WebSocket
- Lambda functions (connect, disconnect, sendMessage)
- DynamoDB table (ChatMessages)
- IAM roles

## Next Steps After Deployment
1. Update `VITE_WS_URL` in frontend with deployed WebSocket URL
2. Redeploy frontend: `vercel --prod`

**Note**: This is a production-ready serverless chat application with proper error handling, reconnection logic, and scalable architecture.


# ChatGPT Clone

A full-stack ChatGPT clone application built with React, TypeScript, and Node.js. This project features a clean chat interface with typing animations and integrates with OpenAI's GPT-3.5-turbo model.

## Features

- Real-time chat interface with AI responses
- Typing animation effect for bot responses
- Loading indicators while waiting for responses
- Clean and responsive UI
- Full-stack architecture with separate client and server
- TypeScript support for type safety

## Tech Stack

### Frontend
- [React](https://react.dev/) 19.1.0
- [TypeScript](https://www.typescriptlang.org/) 5.8.3
- [Vite](https://vitejs.dev/) 6.3.5
- CSS for styling

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) 5.1.0
- [OpenAI API](https://platform.openai.com/) 5.6.0
- [CORS](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv)

## Project Structure

```
chatgpt-clone/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── component/     # React components
│   │   │   ├── ChatMessage/
│   │   │   ├── LoadingDots/
│   │   │   └── TypingText/
│   │   ├── App.tsx        # Main application component
│   │   ├── main.tsx       # Application entry point
│   │   └── *.css          # Styling files
│   └── package.json
├── server/                # Express backend server
│   ├── server.js          # Server entry point
│   └── package.json
└── README.md
```


## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An [OpenAI API key](https://platform.openai.com/api-keys)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd chatgpt-clone
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

### 4. Set up environment variables

Create a `.env` file in the `server` directory:

```bash
cd ../server
touch .env
```

Add your OpenAI API key to the `.env` file:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Running the Application

### Start the backend server

```bash
cd server
npm run server
```

The server will start on [https://chatgpt-clone-c1hk.onrender.com](https://chatgpt-clone-c1hk.onrender.com)

### Start the frontend development server

In a new terminal:

```bash
cd client
npm run dev
```

The client will start on [http://localhost:5173](http://localhost:5173)

## Usage

1. Open your browser and navigate to the deployed application at [https://chatgpt-clone-c1hk.onrender.com](https://chatgpt-clone-c1hk.onrender.com) or locally at [http://localhost:5173](http://localhost:5173)
2. Type your message in the text area at the bottom
3. Press Enter or click the send button to submit your message
4. Wait for the AI to respond with a typing animation effect

## API Configuration

The OpenAI API is configured with the following parameters in [server/server.js](server/server.js:44-52):

- **Model**: `gpt-3.5-turbo`
- **Temperature**: 0 (deterministic responses)
- **Max Tokens**: 3000
- **Top P**: 1
- **Frequency Penalty**: 0.5 (reduces repetition)
- **Presence Penalty**: 0

You can modify these parameters to customize the AI's behavior.

## Development Scripts

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Server

- `npm run server` - Start server with nodemon (auto-reload on changes)

## Building for Production

### Build the client

```bash
cd client
npm run build
```

The production-ready files will be in the `client/dist` directory.

### Deploy the server

Ensure your environment variables are properly set on your production server, then start the server:

```bash
cd server
node server.js
```

## Troubleshooting

### CORS Issues
The server is configured to accept requests from any origin. If you encounter CORS issues, check the CORS configuration in [server/server.js](server/server.js:14).

### API Key Issues
- Ensure your OpenAI API key is correctly set in the `server/.env` file
- Verify you have sufficient credits in your OpenAI account
- Check that the API key has the necessary permissions

### Port Conflicts
- Server runs on port 3001
- Client runs on port 5173
- If these ports are in use, you can modify them in the respective configuration files

## Acknowledgments

- Built with OpenAI's GPT-3.5-turbo model
- Inspired by JavaScript Mastery [Build and Deploy Your Own ChatGPT AI App in JavaScript | OpenAI, Machine Learning](https://www.youtube.com/watch?v=2FeymQoKvrk)

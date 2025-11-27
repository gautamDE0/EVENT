#!/bin/bash

# Start the backend server
cd server
npm start &

# Start the frontend development server
cd ../client
npm run dev
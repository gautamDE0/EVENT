# Deployment Guide

This guide explains how to deploy the Event Management System using different platforms.

## Prerequisites

1. Create accounts on:
   - GitHub
   - Render (for backend)
   - Vercel (for frontend)

2. Ensure all environment variables are set up correctly

## Method 1: Deploy with Render (Recommended)

### Backend Deployment (Render)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New+" and select "Web Service"
3. Connect your GitHub repository
4. Set the following:
   - Name: `event-backend`
   - Region: Choose the closest to your users
   - Branch: `main`
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PHONE_EMAIL_CLIENT_ID`: Your Phone.email client ID
6. Click "Create Web Service"

### Frontend Deployment (Render)

1. In the same Render dashboard, click "New+" and select "Static Site"
2. Connect your GitHub repository
3. Set the following:
   - Name: `event-frontend`
   - Branch: `main`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Add environment variables:
   - `VITE_API_URL`: Your backend URL (from previous step)
5. Click "Create Static Site"

## Method 2: Deploy with Vercel

### Frontend Deployment (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set the following:
   - Framework Preset: `Vite`
   - Root Directory: `client`
5. Add environment variables:
   - `VITE_API_URL`: Your backend URL
6. Click "Deploy"

### Backend Deployment (Vercel Serverless Functions)

Note: Vercel is primarily for frontend. For backend, you'll need another service like:
- Render (recommended)
- Heroku
- DigitalOcean App Platform

## Method 3: Separate Deployments

### Backend (Render/Heroku/DigitalOcean)

1. Push your code to GitHub
2. Connect your repository to your chosen hosting platform
3. Set environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PHONE_EMAIL_CLIENT_ID=your_phone_email_client_id
   ```

### Frontend (Vercel/Netlify)

1. Push your code to GitHub
2. Connect your repository to your chosen hosting platform
3. Set environment variables:
   ```
   VITE_API_URL=your_backend_production_url
   ```

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PHONE_EMAIL_CLIENT_ID=your_phone_email_client_id
```

### Frontend (.env.production)
```
VITE_API_URL=your_backend_production_url
```

## Post-Deployment Steps

1. Update CORS settings in your backend with your frontend URL
2. Test all API endpoints
3. Verify admin login works
4. Test event creation and management
5. Verify student signup and login

## Troubleshooting

1. If you see "Network Error" on frontend:
   - Check if backend URL is correct in environment variables
   - Verify CORS settings on backend

2. If login/signup fails:
   - Check MongoDB connection
   - Verify JWT_SECRET is set correctly

3. If events don't load:
   - Check database connection
   - Verify API endpoints are working

## Updating Your Application

1. Push changes to your GitHub repository
2. Render/Vercel will automatically redeploy
3. For manual deployments, trigger deployment from dashboard
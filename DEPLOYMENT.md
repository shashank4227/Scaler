# Deployment Guide

## Backend (Render)

1.  **Create a Web Service** on Render.
2.  **Connect GitHub** and select your repository.
3.  **Root Directory**: `server`
4.  **Runtime**: `Node`
5.  **Build Command**: `npm install`
6.  **Start Command**: `npm start` (or `node server.js`)
7.  **Environment Variables**:
    - `DB_HOST`: Your database host
    - `DB_USER`: Your database user
    - `DB_PASSWORD`: Your database password
    - `DB_NAME`: Your database name
    - `PORT`: `5000` (optional, Render sets this automatically)

## Frontend (Vercel)

1.  **Import Project** on Vercel.
2.  **Root Directory**: `client`
3.  **Framework Preset**: `Vite`
4.  **Build Command**: `npm run build`
5.  **Output Directory**: `dist`
6.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-app.onrender.com`)

## Database (Aiven/Remote MySQL)

Since you are deploying, you cannot use `localhost` for your database.
1.  Create a free MySQL database on a provider like **Aiven** or **TiDB Cloud**.
2.  Get the connection details (Host, User, Password, Database Name).
3.  Add these details to your Backend Environment Variables on Render.

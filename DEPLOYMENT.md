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

## Database (MySQL)

You need a cloud-hosted MySQL database. **Aiven** offers a free tier that is easy to set up.

### Option A: Aiven (Free Tier)
1.  **Sign up** at [https://aiven.io/](https://aiven.io/).
2.  **Create a new service**:
    - Select **MySQL**.
    - Choose **Cloud Provider** (e.g., Google Cloud, AWS) and **Region**.
    - Select the **Free Plan** (Sandbox).
    - Give it a name (e.g., `flipkart-db`).
3.  **Get Configuration**:
    - Once running, note the **Service URI** or separate fields:
        - **Host**: (e.g., `mysql-service-name.aivencloud.com`)
        - **Port**: (e.g., `12345`)
        - **User**: `avnadmin`
        - **Password**: (hidden, click to reveal)
        - **Database Name**: `defaultdb` (or create a new one).
4.  **Important**: You must disable "SSL required" or download the CA certificate if you get connection errors. For simplest setup, ensure your client can connect securely or check if "Require SSL" can be toggled for testing.

### Option B: TiDB Cloud (Free Serverless)
1.  **Sign up** at [https://tidbcloud.com/](https://tidbcloud.com/).
2.  Create a free **Serverless Tier** cluster.
3.  Get the connection details formatted for standard MySQL.

### Connect Backend to Database
On your **Render** Dashboard for the backend service:
1.  Go to **Environment**.
2.  Add the following variables matching your cloud DB details:
    - `DB_HOST`
    - `DB_USER`
    - `DB_PASSWORD`
    - `DB_NAME`
    - `DB_PORT` (if not 3306)

### Migrate Data
You will need to manually import your local data to the cloud database.
1.  Export your local DB: `mysqldump -u root -p flipkart_clone > dump.sql`
2.  Import to Cloud DB:
    - Use a tool like **MySQL Workbench** or **DBeaver**.
    - Connect to the *Remote Cloud Database* using the credentials above.
    - Run the SQL definition script (or import the `dump.sql`).

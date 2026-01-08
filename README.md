# Flipkart Clone

A functional e-commerce web application that replicates Flipkart's design and user experience.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Assumptions
- Default "Guest" Login is assumed for the checkout flow.
- Database runs on localhost with default root credentials (password: empty) or as configured in .env.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MySQL Server

### Database Setup
1. Open your MySQL client (Workbench or CLI).
2. Execute the script located at `server/database.sql` to create the schema and seed data.

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional, defaults provided in `config/db.js`):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=flipkart_clone
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the browser at `http://localhost:5173`.

## Features
- **Product Listing**: Grid view with categories and filters.
- **Product Details**: Image carousel, offers, and detailed specifications.
- **Cart Management**: Add/Remove items, update quantities, price summary.
- **Checkout Flow**: Address form, Order Summary, Payment Options (simulated).
- **Order Confirmation**: Displays unique Order ID.

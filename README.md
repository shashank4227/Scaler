# Scaler Assignment - Flipkart Clone

A full-stack e-commerce web application built as part of the Scaler SDE Intern Assignment. This project mimics core functionalities of Flipkart, including product listing, detailed product views, and cart management.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Routing**: [React Router](https://reactrouter.com/) (v7)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (v5)
- **Database**: [MySQL](https://www.mysql.com/) (using `mysql2` driver)

## 🛠️ Project Structure

```
Scaler/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Header, Footer, etc.)
│   │   ├── context/        # React Context (e.g., CartContext)
│   │   ├── pages/          # Application Pages (Home, ProductDetail, Cart)
│   │   └── ...
│   └── ...
├── server/                 # Backend Express Application
│   ├── config/             # Database configuration
│   ├── routes/             # API Routes
│   ├── scripts/            # Utility scripts
│   └── ...
└── ...
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- MySQL Server installed and running

### 1. Database Setup
1. Create a MySQL database (e.g., `flipkart_clone`).
2. Import the provided SQL schema (if available, e.g., `server/database_planetscale.sql` or `server/database.sql`) to create the necessary tables (`products`, `categories`, `users`, etc.).

### 2. Backend Setup
Navigate to the `server` directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `server` directory with your database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=flipkart_clone
PORT=5000
```

Start the server:
```bash
npm run start
```
The server should be running on `http://localhost:5000`.

### 3. Frontend Setup
Navigate to the `client` directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `client` directory to point to your backend:
```env
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

## ✨ Features
- **Product Listing**: Browse products by category.
- **Product Details**: View detailed information, images, and pricing for products.
- **Shopping Cart**: Add products to cart and manage quantities.
- **Responsive Design**: Optimized for both desktop and mobile views.

## 📝 Scripts
- **Server**:
  - `npm start`: Runs the server using `node server.js`.
- **Client**:
  - `npm run dev`: Starts the Vite development server.
  - `npm run build`: Builds the app for production.
  - `npm run preview`: Preview the production build locally.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import Footer from './components/Footer';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmedPage from './pages/OrderConfirmedPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#f1f3f6] flex flex-col">
          <Header />
          <CategoryNav />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App

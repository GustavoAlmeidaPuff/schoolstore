import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Notification from './components/Notification';
import './styles/App.css';

const Header = () => {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo-container">
          <img src="/images/logo.png" alt="Menu 304" className="header-logo" />
          <span className="header-title">Lanches 304</span>
        </Link>
        <Link to="/cart" className="cart-icon-container">
          <FaShoppingCart className="cart-icon" />
          {itemCount > 0 && <span className="cart-counter">{itemCount}</span>}
        </Link>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Header />
          <Notification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

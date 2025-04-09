import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import './Notification.css';

const Notification = () => {
  const { notification } = useCart();
  const navigate = useNavigate();

  if (!notification.show) {
    return null;
  }

  const product = notification.product;
  const productName = product ? product.name : '';

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div className="notification-container">
      <div className="notification" onClick={handleClick}>
        <FaCheckCircle className="notification-icon" />
        <div className="notification-content">
          <h3>Produto adicionado!</h3>
          <p>{productName} foi adicionado ao carrinho</p>
        </div>
        <FaShoppingCart className="notification-cart-icon" />
      </div>
    </div>
  );
};

export default Notification; 
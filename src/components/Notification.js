import React from 'react';
import { useCart } from '../context/CartContext';
import { FaCheckCircle } from 'react-icons/fa';
import './Notification.css';

const Notification = () => {
  const { notification } = useCart();

  if (!notification.show) {
    return null;
  }

  const product = notification.product;
  const productName = product ? product.name : '';

  return (
    <div className="notification-container">
      <div className="notification">
        <FaCheckCircle className="notification-icon" />
        <div className="notification-content">
          <h3>Produto adicionado!</h3>
          <p>{productName} foi adicionado ao carrinho</p>
        </div>
      </div>
    </div>
  );
};

export default Notification; 
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart = ({ items, removeFromCart }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    const message = `*Novo Pedido*\n\n${items
      .map(item => `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')}\n\n*Total: R$ ${total.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`);
  };

  return (
    <div className="cart">
      <h2 className="cart-title">Meu Carrinho</h2>
      
      <div className="cart-items">
        {items.map(item => (
          <div
            key={item.id}
            className="cart-item"
          >
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">{item.quantity} x R$ {item.price.toFixed(2)}</span>
            </div>
            <div className="item-actions">
              <span className="item-total">
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remover item"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 ? (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span className="total-price">
              R$ {total.toFixed(2)}
            </span>
          </div>
          <button
            className="checkout-button"
            onClick={handleWhatsAppCheckout}
          >
            Continuar no WhatsApp
          </button>
        </div>
      ) : (
        <p className="empty-cart">
          Seu carrinho está vazio
        </p>
      )}
    </div>
  );
};

export default Cart; 
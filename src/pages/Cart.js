import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione itens ao seu carrinho para continuar</p>
        <Link to="/" className="back-to-menu">
          <FaArrowLeft /> Voltar para o menu
        </Link>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const orderText = items.map(item => 
      `*${item.name}* (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = `*Novo Pedido - Menu 304*\n\n${orderText}\n\n*Total: R$ ${total.toFixed(2)}*`;
    
    const whatsappUrl = `https://wa.me/5551995245650?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <Link to="/" className="back-to-menu">
          <FaArrowLeft /> Voltar para o menu
        </Link>
        <h2>Seu Carrinho</h2>
      </div>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <div>
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">R$ {item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="item-actions">
              <div className="quantity-control">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="subtotal">
          <span>Subtotal:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="total">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn whatsapp-btn" onClick={handleWhatsAppOrder}>
          <FaWhatsapp /> Continuar no WhatsApp
        </button>
        <p className="payment-info">
          Aceitamos Pix via encomendas, mas presencialmente apenas dinheiro!
        </p>
      </div>
    </div>
  );
};

export default Cart; 
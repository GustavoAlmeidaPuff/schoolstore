import React, { useState } from 'react';
import './Menu.css';

const products = [
  {
    id: 1,
    name: 'SUCO',
    description: 'Guaraná\nLaranja',
    price: 1.50,
    category: 'Bebidas',
    image: '/images/suco-laranja.png'
  },
  {
    id: 2,
    name: 'MINI PIZZA SALGADA OU DOCE',
    description: 'Calabresa\nChocolate',
    price: 8.00,
    category: 'Sanduiches',
    images: ['/images/pizza-s.jpg', '/images/pizza-d.jpg'],
    imageType: 'sideBySide'
  },
  {
    id: 3,
    name: 'COMBO PIZZA DOCE E SALGADA',
    description: 'Chocolate\ne Calabresa',
    price: 15.00,
    category: 'Combos',
    images: ['/images/pizza-d.jpg', '/images/pizza-s.jpg'],
    imageType: 'overlapping'
  }
];

const Menu = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', 'Sanduiches', 'Bebidas', 'Combos'];
  
  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const renderProductImage = (product) => {
    if (product.image) {
      return (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      );
    } else if (product.images && product.imageType === 'sideBySide') {
      return (
        <div className="side-by-side-images">
          <img
            src={product.images[0]}
            alt="Pizza Salgada"
            className="product-image half"
          />
          <img
            src={product.images[1]}
            alt="Pizza Doce"
            className="product-image half"
          />
        </div>
      );
    } else if (product.images && product.imageType === 'overlapping') {
      return (
        <div className="overlapping-images">
          <img
            src={product.images[0]}
            alt="Pizza Doce"
            className="product-image back"
          />
          <img
            src={product.images[1]}
            alt="Pizza Salgada"
            className="product-image front"
          />
        </div>
      );
    }
  };

  return (
    <div className="menu">
      <div className="menu-header">
        <h1 className="menu-title">Menu <span className="highlight">304</span></h1>
        <p className="menu-subtitle">
          Deliciosas opções para seu lanche escolar
        </p>
      </div>
      
      <div className="categories">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              {renderProductImage(product)}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">R$ {product.price.toFixed(2)}</div>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                + Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu; 
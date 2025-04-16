import React, { useState } from 'react';
import './Menu.css';

const products = [
  {
    id: 1,
    name: 'SUCO',
    description: 'Guaraná\nLaranja',
    price: 1.50,
    category: 'Bebidas',
    image: '/images/suco-laranja.png',
    outOfStock: false
  },
  {
    id: 2,
    name: 'MINI PIZZA SALGADA OU DOCE',
    description: 'Calabresa\nChocolate',
    price: 8.00,
    category: 'Lanches',
    images: ['/images/pizza-s.jpg', '/images/pizza-d.jpg'],
    imageType: 'sideBySide',
    outOfStock: true
  },
  {
    id: 3,
    name: 'COMBO PIZZA DOCE E SALGADA',
    description: 'Chocolate\ne Calabresa',
    price: 15.00,
    category: 'Combos',
    images: ['/images/pizza-d.jpg', '/images/pizza-s.jpg'],
    imageType: 'overlapping',
    outOfStock: true
  },
  {
    id: 4,
    name: 'PEDAÇO DE BOLO',
    description: 'Bolo caseiro\nSabores diversos',
    price: 7.00,
    category: 'Lanches',
    image: '/images/bolo.png',
    outOfStock: false
  },
  {
    id: 5,
    name: 'MISTO QUENTE',
    description: 'Pão, presunto, queijo\ne manteiga',
    price: 4.50,
    category: 'Lanches',
    image: '/images/torrada.png',
    outOfStock: false
  }
];

const Menu = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', 'Lanches', 'Bebidas', 'Combos'];
  
  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const isSingleProduct = filteredProducts.length === 1;

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

  const handleAddToCart = (product) => {
    if (!product.outOfStock) {
      addToCart(product);
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

      <div className={`products-grid ${isSingleProduct ? 'single-product' : ''}`}>
        {filteredProducts.map(product => (
          <div key={product.id} className={`product-card ${product.outOfStock ? 'out-of-stock' : ''}`}>
            <div className="product-image-container">
              {renderProductImage(product)}
              {product.outOfStock && <div className="out-of-stock-label">EM FALTA</div>}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">R$ {product.price.toFixed(2)}</div>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
                disabled={product.outOfStock}
              >
                {product.outOfStock ? 'Indisponível' : '+ Adicionar ao Carrinho'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu; 
import React from 'react';
import Menu from '../components/Menu';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="home">
      <Menu addToCart={addToCart} />
    </div>
  );
};

export default Home; 
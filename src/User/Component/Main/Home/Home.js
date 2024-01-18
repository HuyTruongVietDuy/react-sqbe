import React from 'react';
import './HomeCSS/Home.css';

import CategorySlide from './ComponentHome/CategorySlide';
import HomeProduct from './ComponentHome/HomeProduct';
import News from './ComponentHome/News';

function Home() {
  const handleGoToShoppingHover = () => {
    const backgroundImage = document.querySelector('.BackGroud-Home img');
    if (backgroundImage) {
      backgroundImage.classList.toggle('blur-image');
    }
  };

  return (
    <div>
      <div className='BackGroud-Home'>
        <img src="./image/background2.jpg" alt="background" />
        <p
          className='go-to-shopping'
          onMouseEnter={handleGoToShoppingHover}
          onMouseLeave={handleGoToShoppingHover}
        >
          GO TO SHOPPING
        </p>
      </div>
      <CategorySlide />
      <HomeProduct />
      <News />
    </div>
  );
}

export default Home;

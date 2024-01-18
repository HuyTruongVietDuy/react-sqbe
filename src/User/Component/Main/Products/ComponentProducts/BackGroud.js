

import React from 'react';
import "../ProductCSS/background-product.css"
const BackGround = () => {
  return (
    <div>
      <div className='background-Product'>
        <video autoPlay loop muted>
          <source src="./image/3003166451.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default BackGround;

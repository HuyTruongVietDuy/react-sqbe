import React from 'react';
import '../HomeCSS/HomeProduct.css'
const HomeProduct = () => {
 
  return (
    <div className='HomeProduct'>

    <div className='title-HomeProduct'>
      <h1> Sản Phẩm Nổi Bật</h1>
    </div>
      
      
    <div className='Container-Product'>

    <div className='box-Product'>
        <div className='Hot-Product'>HOT</div>
        <div className='Image-Container'>
            <div className='Image-Product'>  <img src="./image/product1.jpg" alt='a'/></div>
            <div className='Image-Product-hover'>  <img src="./image/product1.jpg" alt='a'/></div>
        </div>
        <div className='Name-Product'>Name Product</div>
        <div className='Price-Product'>Price Product</div>
        <div className='Button-Buy-Product'><button>Mua</button></div>
    </div>

     <div className='box-Product'>
        <div className='Hot-Product'>HOT</div>
        <div className='Image-Container'>
            <div className='Image-Product'>  <img src="./image/product1.jpg" alt='a'/></div>
            <div className='Image-Product-hover'>  <img src="./image/product1-hove.jpg" alt='a'/></div>
        </div>
        <div className='Name-Product'>Name Product</div>
        <div className='Price-Product'>Price Product</div>
        <div className='Button-Buy-Product'><button>Mua</button></div>
    </div>

    <div className='box-Product'>
    <div className='Hot-Product'>HOT</div>
    <div className='Image-Container'>
        <div className='Image-Product'>  <img src="./image/product1.jpg" alt='a'/></div>
        <div className='Image-Product-hover'>  <img src="./image/product1-hove.jpg" alt='â'/></div>
    </div>
    <div className='Name-Product'>Name Product</div>
    <div className='Price-Product'>Price Product</div>
    <div className='Button-Buy-Product'><button>Mua</button></div>
</div>

<div className='box-Product'>
<div className='Hot-Product'>HOT</div>
<div className='Image-Container'>
    
    <div className='Image-Product'> <img src="./image/product1.jpg" alt='Product 1'/>
    </div>
    <div className='Image-Product-hover'>  <img src="./image/product1-hove.jpg" alt="Product 1 - Hover"/>
    </div>
</div>
<div className='Name-Product'>Name Product</div>
<div className='Price-Product'>Price Product</div>
<div className='Button-Buy-Product'><button>Mua</button></div>
</div>
    
    

    
    </div>
  



    </div>
  );
};



export default HomeProduct;

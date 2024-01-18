import React from 'react';
import "../ProductCSS/product.css"


const Product = () => {
  return (
   <div>
   <div className='HomeProduct'>
     
   <div className='Container-Product'>

   <div className='box-Product'>
       <div className='Image-Container'>
           <div className='Image-Product'>  <img src="./image/product1.jpg" alt='a'/></div>
           <div className='Image-Product-hover'>  <img src="./image/product1-hove.jpg" alt='a'/></div>
       </div>
       <div className='Name-Product'>Name Product</div>
       <div className='Price-Product'>Price Product</div>
       <div className='Button-Buy-Product'><button>Mua</button></div>
   </div>

   
   

   
   </div>
 



   </div>
   </div>
  );
};

export default Product;

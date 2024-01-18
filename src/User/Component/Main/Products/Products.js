import React from 'react';

import BackGroundProducts from './ComponentProducts/BackGroud';
import Filter from './ComponentProducts/Filter';
import Product from './ComponentProducts/Product';

const Products = () => {
  return (
    <div>
      <BackGroundProducts />
      <Filter/>
      <Product/>
    </div>
  );
};

export default Products;

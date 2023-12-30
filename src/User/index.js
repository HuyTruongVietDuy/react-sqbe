import React from 'react';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
function User() {
  return (
    <div className='Container'>
      <Header/>
      <section style={{paddingTop:"200PX",minHeight:"2000px"}}  ></section>
      <Footer/>
    </div>
  );
}

export default User;

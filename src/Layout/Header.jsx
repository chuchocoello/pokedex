import React from 'react'
import "./style/Header.css"

const Header = () => {
  return (
    <header className='header'>
      <img className='header__img' src="/images/pokedex.png" alt="" />
      <div className='header__black'></div>
      <div className='header__circle'>
        <div className='header__circle-int'></div>

      </div>

    </header>
  ); 
};

export default Header
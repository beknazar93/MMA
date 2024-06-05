import React from 'react';
import Photo from '../Header/img/mlogo.png';
 


function Header() {
  return (
    <div className='header'>
      <div className="container">
        <div className="header__nav">
          <img className='header__logo' src={Photo} />
          <p className='header__title'>Профессиональная MMA <br />школа в Оше </p>
          <p className='header__info'>+996 701 11 15 44 <br />Город:&nbsp;Ош. &nbsp; ул: &nbsp;Масалиева 44. &nbsp;-1 этаж</p>
        </div>
      </div>
    </div>
  )
}
export default Header

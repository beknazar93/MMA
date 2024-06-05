import React from 'react';
import trener from '../We/img/тренерр.png';
import price from '../We/img/price.png';
import eye from '../We/img/eye.png';


function We() {
  return (
    <div className='we'>
      <div className="container">
        <h1 className='we__title'>Почему мы?</h1>
        <p className='we__text'>В чем наши преимущества перед другими школами</p>
        <div className="we__whys">
          <div className="we__whyone">
            <img className='we__why_trener' src={trener} />
            <h3 className='we__why_title'>Квалифицированные Тренеры</h3>
            <p className='we__trener_text'>Занятия проводят квалифицированные тренеры. среди которых есть мастера международного класса.</p>
          </div>
          <div className="we__whytwo">
            <img className='we__why_price' src={price} />
            <h3 className='we__why_title'>Профессиональная команда</h3>
            <p className='we__price_text'>Группа работает над общей целью, например: обязанности и ответственность в команде распределяются, а участники обладают взаимодополняющими навыками.</p>
          </div>
          <div className="we__whythree">
            <img className='we__why_eye' src={eye} />
            <h3 className='we__why_title'>Лучшие спортивные комплексы</h3>
            <p className='we__eye_text'>Занятия спортом помогают поддерживать хорошую физическую форму и придают бодрости.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default We

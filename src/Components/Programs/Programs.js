import React from 'react';
import they from '../Programs/img/общие.png';
import kids from '../Programs/img/kids.png';
import vip from '../Programs/img/вип1.jpg';
import big from '../Programs/img/big.jpg';

function Programs() {
  return (
    <div className='programs'>
      <div className="container">
        <h1 className='programs__title'>Профессиональная школа ММА</h1>
        <p className='programs__text'>Наши программы обучения для любых возрастов</p>
        <div className="programs__age">
          <div className="programs__kid_form">
          <div className="programs__age_kid">
            <img className='programs__kid_photo' src={kids} />
          </div>
          <div className="programs__age_kids">
            <h1 className='programs__kids_title'>ДЕТСКАЯ ГРУППА</h1>
            <p className='programs__kids_text'>Всестороннее развитие ребенка. Любой уровень подготовки. Набор в течение всего года. Пробное занятие бесплатно.</p>
          </div>
          </div>
          
          <div className="programs__big_form">
          <div className="programs__age_big">
            <img className='programs__big_photo' src={big} />
          </div>
          <div className="programs__age_bigs">
            <h1 className='programs__bigs_title'>ВЗРОСЛАЯ ГРУППА</h1>
            <p className='programs__bigs_text'>Запись в общие группы мма для взрослых. Любой уровень подготовки. Набор в течение всего года. Пробное занятие бесплатно.</p>
          </div>
        </div>
          </div>
          
        <div className="programs__class">
          <div className="programs__vip_form">
          <div className="programs__class_vip">
            <img className='programs__vip_photo' src={vip} />
          </div>
          <div className="programs__class_vips">
            <h1 className='programs__vips_title'>VIP ЗАНЯТИЕ</h1>
            <p className='programs__vips_text'>Всестороннее развитие ребенка. Любой уровень подготовки. Набор в течение всего года. Пробное занятие бесплатно.</p>
          </div>
          </div>
          
          <div className="programs__they_form">
          <div className="programs__class_they">
            <img className='programs__they_photo' src={they} />
          </div>
          <div className="programs__class_theys">
            <h1 className='programs__theys_title'>ОБЩИЕ ЗАНЯТИЕ</h1>
            <p className='programs__theys_text'>Запись в общие группы мма для взрослых. Любой уровень подготовки. Набор в течение всего года. Пробное занятие бесплатно.</p>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Programs

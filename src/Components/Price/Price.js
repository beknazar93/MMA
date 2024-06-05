import React, { useState } from 'react'
import kids from '../Price/img/kids.png';
import vip from '../Price/img/вип1.jpg';
import big from '../Price/img/big.jpg';
import SimpleModal from '../SimpleModal/SimpleModal';


function Price({ }) {

  const [modalPrice, setmodalPrice] = useState(false)

  return (
    <div className='price'>
      <div className="container">
        <h1 className='price__title'>Стоимость обучения</h1>
        <p className='price__text'>Ниже представлена информация о ценах:</p>
        <div className="price__group">
          <div className="price__kid">
            <img className='price__kid_photo' src={kids} />

            <div className="price__kid_form">
              <h1 className='price__kid_title'>Детская группа</h1>
              <table className='price__kid_table'>
                <tr className='price__kid_table-tr'>
                  <td>Дни:</td>
                  <td>
                    <div action="" className='price__form'>
                      <select className='price__form_body'>
                        <option className='price__form_body-choose'>Выберите Дни</option>
                        <option className='price__form_body-choose'>ВТ,ЧТ,СБ</option>
                        <option className='price__form_body-choose'>ПН,СР,ПТ</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className='price__kid_table-tr'>
                  <td>Время:</td>
                  <td>
                    <div className='price__form'>
                      <select className='price__form_body'>
                        <option >Выберите Время</option>
                        <option >17:00-18:30</option>
                        <option >19:00-20:30</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className='price__kid_table-tr'>
                  <td>Цена:</td>
                  <td>1500с</td>
                </tr>
              </table>
              <button className='price__kid_btn' onClick={() => setmodalPrice(true)}>Записаться</button>
            </div>

          </div>
          <div className="price__big">
            <img className='price__big_photo' src={big} />
            <div className="price__big_form">
              <h1 className='price__big_title'>Взрослая группа</h1>
              <table className='price__big_table'>
                <tr className='price__big_table-tr'>
                  <td>Дни:</td>
                  <td>
                    <div action="" className='price__form'>
                      <select className='price__form_body'>
                        <option className='price__form_body-choose'>Выберите Дни</option>
                        <option className='price__form_body-choose'>Через День</option>
                        <option className='price__form_body-choose'>Каждый День</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className='price__big_table-tr'>
                  <td>Время:</td>
                  <td>18:30 до 20:30</td>
                </tr>
                <tr className='price__big_table-tr'>
                  <td>Цена:</td>
                  <td>
                    <div className='price__form'>
                      <select className='price__form_body'>
                        <option >Выберите Цену</option>
                        <option >2500c</option>
                        <option >1800c</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </table>
              <button className='price__big_btn' onClick={() => setmodalPrice(true)}>Записаться</button>
            </div>
          </div>
          <div className="price__vip">
            <img className='price__vip_photo' src={vip} />
            <div className="price__vip_form">
              <h1 className='price__vip_title'>VIP тренировки</h1>
              <table className='price__vip_table'>
                <tr className='price__vip_table-tr'>
                  <td>Дни:</td>
                  <td>
                    <div action="" className='price__form'>
                      <select className='price__form_body'>
                        <option className='price__form_body-choose'>Выберите Дни</option>
                        <option className='price__form_body-choose'>Через День</option>
                        <option className='price__form_body-choose'>Каждый День</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className='price__vip_table-tr'>
                  <td>Время:</td>
                  <td>
                    <div className='price__form'>
                      <select className='price__form_body'>
                        <option >Выберите Время</option>
                        <option >?</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className='price__vip_table-tr'>
                  <td>Цена:</td>
                  <td>5000с</td>
                </tr>
              </table>
              <button className='price__vip_btn' onClick={() => setmodalPrice(true)}>Записаться</button>
            </div>

          </div>
        </div>
        <SimpleModal
          isOpen={modalPrice}
          onClose={() => setmodalPrice(false)}>
          <h2>Оставить заявку</h2>
          <div className="home__modalform">
            <div className='home__modalform_kub'>
              <p className='home__kub_text'>Введите имя</p>
              <input className='home__kub_pole' placeholder='Введите имя' />
            </div>
            <div className='home__modalform_kub'>
              <p className='home__kub_text'>Введите E-mail</p>
              <input className='home__kub_pole' placeholder='Введите E-mail' />
            </div>
            <div className='home__modalform_kub'>
              <p className='home__kub_text'>Введите номер телефон</p>
              <input className='home__kub_pole' placeholder='Введите номер телефон' />
            </div>
            <div className="home__modalform_btn">

            </div>
            <button className='home__modalbtn'>Оправить заявку</button>

          </div>
          
        </SimpleModal>
      </div>
    </div>
  )
}

export default Price

import React from 'react';
import adres from '../Footer/img/adres.png';
import tel from '../Footer/img/tel.png';
import email from '../Footer/img/email.png';


function Footer() {
    return (
        <div className='footer'>
            <div className="container">
                <h1 className='footer__title'>Наши контакты</h1>
                <p className='footer__text'>Адрес,Телефон и Электронная почта</p>
                <div className="footer__contact">
                    <div className="footer__contact_adres">
                        <img className='footer__adres_photo' src={adres} />
                        <h1 className='footer__adres_title'>Адрес</h1>
                        <p className='footer__adres_text'>Гр: ОШ, Ул: Масалиева 44, -1 этаж</p>
                    </div>
                    <div className="footer__contact_tel">
                        <img className='footer__tel_photo' src={tel} />
                        <h1 className='footer__tel_title'>Телефон</h1>
                        <p className='footer__tel_text'>Телефон: +996 701 11 15 44</p>
                    </div>
                    <div className="footer__contact_email">
                        <img className='footer__email_photo' src={email} />
                        <h1 className='footer__email_title'>Эл Почта</h1>
                        <p className='footer__email_text'>Почта: abytov247@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer

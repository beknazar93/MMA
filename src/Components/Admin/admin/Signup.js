import React from "react";

const Signup = () => {
  return (
    <div className="container"> 

      <div className="signup">
        <h1 className="signup__tile">Вход</h1>
        <div className="signup__form">
          <input className="signup__form-inputs" type="text" placeholder="Введите имя и фамилию..."/>
          <input className="signup__form-inputs" type="email" placeholder="Введите эл почту..."/>
          <input className="signup__form-inputs" type="password"  placeholder="Введите пароль..."/>
          
        </div>
        <button className="signup__btn">Вход</button>
      </div>
      
    </div>

  );
};

export default Signup;

import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import {URL} from '../../Utils'
import {Bolacha} from '../../Cookies'
import { ToastContainer, Toast } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const [dataEmail, setDataEmail] = useState({ value: "", dirty: false });
  const [dataPassword, setDataPassword] = useState({ value: "", dirty: false });
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const login = async (event, email, password )=>{
    try{
      event.preventDefault()
      const RESOURCE_URL = `${URL.SERVER}:${URL.PORT}`
      const result = await fetch(RESOURCE_URL, {
        method: 'POST',
        headers:{'Content-Type': 'application/json'}, 
        body: { email, password }
      } )
      if(!result.ok){
      throw new Error('Credenciais Inválidas')  
      }
      const jsonResult = result.toObject()
      Bolacha.insert('token',jsonResult.token)
    }catch(error){
      toast.error('Credenciais Inválidas')
    }
  }

  const handleErrorEmail = (data) => {
    if (!data.value && data.dirty) {
      return <h6 className="error">Campo Obrigatório</h6>;
    } else if (!emailRegex.test(data.value) && data.dirty) {
      return (<h6 className="error">Email Inválido</h6>)
    }else {
      return (<h6 className="error"></h6>)
    }
  };

  const handleErrorPassword = (data) => {
    if (!data.value && data.dirty) {
      return (<h6 className="error">Campo Obrigatório</h6>)
    }else {
      return (<h6 className="error"></h6>)
    }
  };

  const handleRequiredError = (data) => {
    if (!data.value && data.dirty) {
      return (<h6 className="error">Campo Obrigatório</h6>)
    }else {
      return (<h6 className="error"></h6>)
    }
  };

  return (
    <div id="loginContainer">
      <form id="loginForm">
        <h1>Seja bem vindo!</h1>
        <label htmlFor="emailInput">Email</label>
        <input
          onChange={(e) => {
            setDataEmail({ value: e.target.value, dirty: true });
          }}
          type="email"
          name="email"
          id="emailInput"
        />
        {handleErrorEmail(dataEmail)}

        <label htmlFor="passwordInput">Senha</label>
        <input
          onChange={(e) => {
            setDataPassword({ value: e.target.value, dirty: true });
          }}
          type="password"
          name="password"
          id="passwordInput"
        />
        {handleErrorPassword(dataPassword)}
        <button onClick={(event) => login(event, dataEmail.value, dataPassword.value)}>Enviar</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;

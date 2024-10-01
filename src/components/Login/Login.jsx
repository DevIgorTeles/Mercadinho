import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { URL } from '../../Utils';
import { Bolacha } from '../../Cookies'; // Importando o módulo Bolacha
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [dataEmail, setDataEmail] = useState({ value: '', dirty: false });
  const [dataPassword, setDataPassword] = useState({ value: '', dirty: false });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const login = async (event, email, password) => {
    try {
      event.preventDefault();
      const RESOURCE_URL = `${URL.SERVER}:${URL.PORT}/login`;
      const result = await fetch(RESOURCE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!result.ok) {
        throw new Error('Credenciais Inválidas');
      }

      const jsonResult = await result.json();
      Bolacha.insert('token', jsonResult.token); // Armazena o token no Bolacha
      toast.success('Login realizado com sucesso!');
      navigate('/home');
    } catch (error) {
      toast.error('Credenciais Inválidas');
    }
  };

  const handleErrorEmail = (data) => {
    if (!data.value && data.dirty) {
      return <h6 className="error">Campo Obrigatório</h6>;
    } else if (!emailRegex.test(data.value) && data.dirty) {
      return (<h6 className="error">Email Inválido</h6>);
    } else {
      return (<h6 className="error"></h6>);
    }
  };

  const handleErrorPassword = (data) => {
    if (!data.value && data.dirty) {
      return (<h6 className="error">Campo Obrigatório</h6>);
    } else {
      return (<h6 className="error"></h6>);
    }
  };

  return (
    <div id="loginContainer">
      <form id="loginForm">
        <h1>Seja bem vindo!</h1>
        <label htmlFor="emailInput">Email</label>
        <input
          id="emailInput"
          type="email"
          onChange={(e) => { setDataEmail({ value: e.target.value, dirty: true }) }}
        />
        {handleErrorEmail(dataEmail)}

        <label htmlFor="passwordInput">Senha</label>
        <input
          id="passwordInput"
          type="password"
          onChange={(e) => { setDataPassword({ value: e.target.value, dirty: true }) }}
        />
        {handleErrorPassword(dataPassword)}
        <button onClick={(event) => login(event, dataEmail.value, dataPassword.value)}>Enviar</button>
      </form>
      
    </div>
  );
};

export default Login;

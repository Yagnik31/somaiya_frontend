import { useState } from "react";
import "./Login.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "", 
    password: ""
  })

  function handleOnSubmit(e) {
    e.preventDefault();
    
    axios.post("https://somaiya-backend.onrender.com/login", loginData).then((res) => {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if(res.data.user.role == "teacher"){
        navigate('/teacher/home');
      }else{
        navigate('/student/home')
      }
    }).catch((err) => {
      console.log(err)
      
    })
    
  }


  function handleOnChange(e){
      setLoginData((prev) => {
        return {...prev, [e.target.name]: e.target.value }
      })
  }


  return (
    <div className="login-container w-full h-screen">
      <div className="bg-white p-5 w-[400px] h-[450px] rounded-md flex flex-col items-center">
        <div className="logo">
          <img  
            className="w-[350px]"
            src="https://polytechnic.somaiya.edu.in/media/images/polytechnic_home_logo.jpg"
            alt="Somaiya Logo"
          />
        </div>
        <h1 className="text-2xl mb-4">Somaiya Classroom</h1>
        <form id="loginForm" onSubmit={handleOnSubmit}>
          <input
            
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="input-field p-2 mb-4"
            onChange={handleOnChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            className="input-field p-2 mb-2"
            onChange={handleOnChange}
          />
          <button type="submit"  className="login-button bg-red-900 p-2 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

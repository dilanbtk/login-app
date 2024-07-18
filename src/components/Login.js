import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { withNamespaces } from 'react-i18next';


const Login = ({t}) => {
  // login işlemi için kullanıcıdan email ve password bilgilerini alıyoruz yapılacak işlemler sonucunda kullanıcıyı yönlendireceğimiz sayfayı belirliyoruz 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      login(email, password); // Login işlemi sırasında email ve password bilgilerini aktarıyoruz
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your email and password.');
      console.error(err);
    }
  };



  
  return (
    <div
      className=" w-full flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/background.jpeg')" }}
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm bg-opacity-90">
        <h2 className="text-2xl font-bold mb-4 text-black font-serif">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
           
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="g-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50"
              required
               placeholder= {t('email') }
            />
          </div>
          <div className="mb-6">
          
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50"
              required
              placeholder={t('password')}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {t('login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withNamespaces()(Login);

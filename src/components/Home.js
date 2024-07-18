import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TodoApp from './TodoApp';

const Home = () => {
  const {  logout } = useContext(AuthContext);
  // use context hook'unu kullanarak logout fonksiyonunu alıyoruz. Bu fonksiyonu kullanarak kullanıcıyı logout edebileceğiz.    

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl bg-opacity-90">
        <TodoApp />
        <button
          onClick={logout}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;


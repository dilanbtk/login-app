import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  //  Kullanıcı giriş yapmadan home sayfasına erişmeye çalıştığında kullanıcıyı login sayfasına yönlendiriyoruz.
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }//  Kullanıcı giriş yapmışsa children'ı döndürüyoruz.  Bu sayede kullanıcı giriş yapmışsa home sayfasına erişebilecek. 
  // Su anki durumda home sayfasına erişmek için giriş yapmış olması gerekiyor.  Bu sayede home sayfası korunmuş oluyor.

  return children;
};

export default ProtectedRoute;

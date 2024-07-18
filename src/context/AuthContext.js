import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const userData = { email, password }; // User objesini email ve password ile oluşturuyoruz
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));//user objesini local storage'a kaydediyoruz 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Burada local storage'daki user objesini siliyoruz. Bu sayede kullanıcı logout olduğunda local storage'daki user objesi silinmiş oluyor.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


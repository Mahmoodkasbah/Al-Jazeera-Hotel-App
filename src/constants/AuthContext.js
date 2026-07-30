// src/constants/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // التحقق من حالة المصادقة وحفظ بيانات المستخدم عند تشغيل التطبيق
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedUserJson = await AsyncStorage.getItem('currentUser');
        if (storedUserJson) {
          const parsedUser = JSON.parse(storedUserJson);
          setCurrentUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.log('خطأ أثناء استرجاع بيانات المصادقة:', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // دالة تسجيل الدخول (تحفظ الكائن كاملاً بما فيه رقم الجوال الاسم والإيميل)
  const login = async (userData) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } catch (e) {
      console.log('خطأ أثناء حفظ بيانات تسجيل الدخول:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // دالة تسجيل الخروج (تحذف البيانات وتغير الحالة)
  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('currentUser');
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.log('خطأ أثناء تسجيل الخروج:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('يجب استخدام useAuth داخل نطاق AuthProvider');
  }
  return context;
};
// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  clearanceLevel: 0,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Set session cookie upon successful login
      Cookies.set('session', action.payload.clearanceLevel, { expires: 1, path: '/' });
      return {
        ...state,
        isAuthenticated: true,
        clearanceLevel: action.payload.clearanceLevel,
      };
    case 'LOGOUT':
      // Remove session cookie upon logout
      Cookies.remove('session', { path: '/' });
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session cookie on component mount
  useEffect(() => {
    const sessionCookie = Cookies.get('session');
    if (sessionCookie) {
      dispatch({ type: 'LOGIN', payload: { clearanceLevel: Number(sessionCookie) } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

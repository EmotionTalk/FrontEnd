import { useEffect, useState } from 'react';
import './App.css';
import { useCookieManager } from './customHook/useCookieManager';
import router from './routes/router';
import {RouterProvider} from 'react-router-dom'
function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const {getCookies} =useCookieManager();

  const onLoginSuccess=()=>{
    setIsAuthenticated(true);
    setErrorMessage("");
  }

  const onLoginFailure=(message)=>{
    setIsAuthenticated(false);
    setErrorMessage(message);
  }

  useEffect(()=>{
    const { accessToken, refreshToken } = getCookies();

    if (accessToken && refreshToken) {
      setIsAuthenticated(true); // 토큰이 존재하면 인증 상태를 true로 설정
    }
  }, [getCookies])

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
import { useNavigate } from "react-router-dom";
import { useCookieManager } from "../../customHook/useCookieManager";
import { useEffect,useState } from "react";

 
export function KakaoRedirect() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const navigate=useNavigate();
  const { setCookies }=useCookieManager();

  const onLoginSuccess=()=>{
    setIsAuthenticated(true);
    setErrorMessage("");
  }

  const onLoginFailure=(message)=>{
    setIsAuthenticated(false);
    setErrorMessage(message);
  }

  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const accessToken=urlParams.get("accessToken");
    const refreshToken=urlParams.get("refreshToken");

    if(accessToken && refreshToken){
      setCookies(accessToken,refreshToken);
      onLoginSuccess();
      navigate("/");
    }
    else{
      onLoginFailure("OAuth login failed. Missing tokens.")
      navigate("/first");
    }
  },[navigate,onLoginSuccess,onLoginFailure,setCookies])

  return (
    <div>
      로그인중
    </div>
  );
}
export default KakaoRedirect;
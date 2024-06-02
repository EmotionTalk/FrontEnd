import {useCookies} from 'react-cookie';

export const useCookieManager=()=>{
    const [cookies,setCookie, removeCookie]=useCookies(['accessToken','refreshToken']);
    
    // 쿠키 설정
    const setCookies=(accessToken,refreshToken)=>{
        setCookie('accessToken',accessToken,{path:'/',expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});
        setCookie('refreshToken',refreshToken,{path:'/',expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});
    }

    // 쿠키 값 가져오기
    const getCookies=()=>{
        return{
            accessToken:cookies.accessToken,
            refreshToken:cookies.refreshToken
        }
    }

    // 쿠키 삭제
    const removeCookies=()=>{
        removeCookie('accessToken',{path:'/'});
        removeCookie('refreshToken',{path:'/'});
    }

    return{
        setCookies,
        getCookies,
        removeCookies
    }
}
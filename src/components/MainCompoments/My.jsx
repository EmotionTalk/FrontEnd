import React, { useEffect , useState} from 'react'
import Profile from "../../assets/profile.png"
import 편집 from "../../assets/편집.svg"
import 나와 from "../../assets/나와.svg"
import {useCookieManager} from "../../customHook/useCookieManager";

const My = () => {
  const [userNickName, setUserNickName] = useState('');
  const {getCookies} = useCookieManager();
  const { accessToken, refreshToken } = getCookies();

  useEffect(() => {
    setUserNickName('로그인을 해주세요!');
        
    if (accessToken && refreshToken) {
            const localAccessToken = getCookies().accessToken;
        fetch('http://localhost:8080/auth/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localAccessToken}` 
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // JSON 형식으로 응답 데이터를 파싱
          })
          .then(data => {
            // 응답 데이터(data)를 처리
            setUserNickName(data.resultData);
            console.log(data);
          })
          .catch(error => {
          });
    }
    
}, [getCookies.accessToken, getCookies.refreshToken]);






  return (
  <div className='my'>
      <div className='navbar'>
        <span className='mynav'>내 정보</span>
      </div>

  <div className="my-profile">
    <img src={Profile} alt="" />
    <span>{userNickName}</span>
  </div>
  
  <div className="mee">
  <div className="me">
    <img src={나와} alt="" />
    <span>나와 채팅</span>
  </div>

  <div className="tnwjd">
    <img src={편집} alt="" />
    <span>프로필 편집</span>
  </div>
  </div>
</div>


  )
}

export default My

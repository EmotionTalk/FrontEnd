import React from "react";
import Logo from "../../assets/et_logo.png";
import KakaoLogo from "../../assets/kakao_logo.png"
import KakaoLoginBtn from "../../assets/kakao_login_medium_wide.png"
import "./style.css";
const KAKAO_REST_API_KEY=process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI=`http://localhost:3000/oauth`;
const kakaoURL=`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

function LoginModal({closeModal}){
    const handleKakaoLogin=()=>{
        window.location.href=kakaoURL
    }
    return(
        <div className="Back" onClick={closeModal}>
            <div className="Container" onClick={e=>e.stopPropagation()}>
                <div className="TopContainer">
                    <img src={Logo} alt="Emotion Talk"/>
                    <h1>EMOTION TALK</h1>
                    <span>감정을 읽고</span>
                    <span> 진실한 대화를 시작하세요</span>
                </div>
                <div className="BottomContainer">
                    <div className="LoginTitle">
                        <span className="UnderLine"></span>
                        <span className="Caption">로그인/회원가입</span>
                    </div>
                    <div className="LoginBtnGroup" onClick={handleKakaoLogin}>
                        <img src={KakaoLogo} alt=""></img>
                        <div className="LoginBtn">카카오로 시작하기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginModal
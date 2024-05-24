import React from "react";
import Logo from "../../assets/et_logo.png";
import KakaoLogo from "../../assets/kakao_logo.png"
import "./style.css";

const Login=()=>{
    return(
        <div className="PageContainer">
            <div className="Container">
                <div className="TopContainer">
                    <img src={Logo} alt="Emotion Talk"></img>
                    <h1>EMOTION TALK</h1>
                </div>
                <div className="BottomContainer">
                    <p className="Text1">감정을 읽고 진실한 대화를 시작하세요</p>
                    <div className="LoginBtnGroup">
                        <img src={KakaoLogo} alt=""></img>
                        <div className="LoginBtn">카카오로 로그인</div>
                    </div>
                    <p className="NoLoginLink">로그인 없이 이용하기</p>
                </div>
            </div>
        </div>
    )
}
export default Login
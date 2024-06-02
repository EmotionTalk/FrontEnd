import React, { useState, useEffect} from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useCookieManager } from '../../storage/cookieManager'; 
import ConfirmModal from "../ConfirmModal";
import User from "../icons/User";


function Menu({ isOpen }) {
    const [isLogin, setIsLogin] = useState(false);
    const { getCookies , removeCookies} = useCookieManager();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userNickName, setUserNickName] = useState('');
    const { accessToken, refreshToken, accessTokenExpiresIn } = getCookies();
    const navigate = useNavigate();

    useEffect(() => {
        
        if (accessToken && refreshToken && accessTokenExpiresIn) {
            setIsLogin(true);
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
              })
              .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
              });
        }
        
    }, [getCookies.accessToken, getCookies.refreshToken, getCookies.accessTokenExpiresIn]);

    const handleLogOut = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmLogOut = () => {
        removeCookies();
        setIsLogin(false);
        setShowConfirmModal(false);
    };

    const handleCancelLogOut = () => {
        setShowConfirmModal(false);
    };
    
    const handleGoLogin = () => {
        navigate('/login');
    };
    
    // const handleGoMyPage = () => {
    //     if (accessToken && refreshToken && accessTokenExpiresIn) {
    //         navigate('/myPage');
    //     }else{
    //         navigate('/login');
    //     }
    // };

    const handleGoVisitedLog = () => {
        if (accessToken && refreshToken && accessTokenExpiresIn) {
            navigate('/visitedLog');
        }else{
            navigate('/login');
        }
    };

    return (
        <S.Container className={`${isOpen ? "open": ""}`}>
            {/* <S.CloseBtn src={closeIcon} onClick={handleClose} /> */}
            <S.UserContainer>
                {/* <S.UserImage src={user} alt="User" /> */}
                <User alt="user" width="100px" height="100px" color="#6c757d"/>
            </S.UserContainer>
            { !isLogin && <S.GoLogin onClick={handleGoLogin}>로그인을 해주세요</S.GoLogin>}
            { isLogin && <S.GoLogin>{userNickName}</S.GoLogin>}
            <S.HoverBox><S.Text2>마이페이지</S.Text2></S.HoverBox>
            <S.HoverBox onClick={handleGoVisitedLog}><S.Text2>방문 기록</S.Text2></S.HoverBox>
            <S.HoverBox><S.Text2>내 리뷰</S.Text2></S.HoverBox>
            
            {isLogin && (
                <S.LogOutContainer onClick={handleLogOut}>
                    {/* <S.LogOutIcon src={logOutIcon} /> */}
                    <S.LogOutText>로그아웃</S.LogOutText>
                </S.LogOutContainer>
            )}
            {showConfirmModal && 
                <ConfirmModal
                    message="로그아웃 하시겠습니까?"
                    onConfirm={handleConfirmLogOut}
                    onCancel={handleCancelLogOut}
                />
            }
        </S.Container>
    );
}

export default Menu;

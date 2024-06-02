import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./style";
import { toast } from "react-toastify";
import SignComplete from "../SignComplete"
import { useCookieManager } from "../../storage/cookieManager";

function AdditionalInfoModal({ onClose }) {
    const location = useLocation(); // useLocation 훅을 이용해 location 가져오기
    const params = new URLSearchParams(location.search);
    const [memberNickName, setMemberNickName] = useState(''); 
    const [memberEmail] = useState(params.get('email'));
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [nicknameError, setNicknameError] = useState('');
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');

    const nickname = useRef('');

    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const { setCookies } = useCookieManager();

    const handleNicknameChange = (event) => {
        const newNickname = event.target.value;
        setMemberNickName(newNickname);
        // 여기에 닉네임 유효성 검사 로직 추가 (예: 길이 제한)
      };

      const handleBirthChange = (e) => {
        setBirth(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const canSubmit = memberNickName && birth && gender && password && confirmPassword && isNicknameValid && isConfirmPasswordValid && !passwordError;

    


    const verifyNickname = async () => {
        setIsNicknameChecked(true);
        console.log(nickname);
        try {
            const response = await fetch('http://localhost:8080/auth/verifyNickname', {
                method: 'POST',
                body:  memberNickName ,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            const data = await response.json();
            console.log(data);
            if (!data) {
                setIsNicknameValid(true);
                setNicknameError('');
                toast.success('사용 가능한 닉네임입니다.');
            } else {
                setIsNicknameValid(false);
                setNicknameError('사용중인 닉네임 입니다.');
                toast.error('사용중인 닉네임 입니다.');
            }
        } catch (error) {
            console.error('Failed to verify nickname:', error);
            setNicknameError('닉네임 인증 중 에러가 발생했습니다.');
            toast.error('닉네임 인증 중 에러가 발생했습니다.');
        }
    };

    const [isSignupComplete, setIsSignupComplete] = useState(false);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        // 서버로 데이터 전송 로직 등
        setIsSignupComplete(true);

        try {
            const response = await fetch('http://localhost:8080/auth/oauth-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    password: password,
                    nickName: memberNickName,
                    birth: birth,
                    gender: gender,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // 쿠키 설정
                setCookies(data.accessToken, data.refreshToken, data.accessTokenExpiresIn);

                setIsSignupComplete(true);
                navigate('/main'); // 회원가입 성공 후 리디렉션
            } else {
                // 서버로부터 오류 응답 처리
                toast.error('회원가입 실패');
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            toast.error('회원가입 중 에러 발생');
        }
    };

    if (isSignupComplete) {
        return <SignComplete onClose={onClose} />;
    }

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
      
        const isValidLength = newPassword.length >= 8 && newPassword.length <= 15;
        const hasSpecialChar = /[*?]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
      
        if (!isValidLength || !hasSpecialChar || !hasLowerCase) {
          if (!isValidLength) {
            setPasswordError("비밀번호는 8~15자 사이여야 합니다.");
          } else if (!hasSpecialChar) {
            setPasswordError("특수문자(*, ?)가 포함되어야 합니다.");
          } else if (!hasLowerCase) {
            setPasswordError("비밀번호에는 최소 한 개의 소문자가 포함되어야 합니다.");
          }
        } else {
          // 유효성 검사를 통과했을 때 에러 메시지를 비워줌
          setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
    
        if (password !== newConfirmPassword) {
            setIsConfirmPasswordValid(false);
        } else {
            setIsConfirmPasswordValid(true);
        }
    };
    

    return (
        <S.ModalContainer>
            <S.ModalContent>
                <S.ModalHeader>
                    <S.ModalTitle>추가 정보 입력</S.ModalTitle>
                </S.ModalHeader>
                <S.ModalBody>
                    <S.Subtitle>소셜로그인시 추가정보를 받아야해요</S.Subtitle>
                    <S.EmailContainer>
                        <S.EmailLabel>이메일</S.EmailLabel>
                        <S.EmailInput
                            type="email"
                            name="email"
                            value={memberEmail}
                            disabled
                        />
                    </S.EmailContainer>

                    <S.PasswordContainer>
                        <S.PasswordLabel>비밀번호</S.PasswordLabel>
                        <S.PasswordInput
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <S.ErrorMessage>{passwordError}</S.ErrorMessage>}
                    </S.PasswordContainer>

                    <S.PasswordCheckContainer>
                        <S.PasswordCheckLabel>비밀번호 확인</S.PasswordCheckLabel>
                        <S.PasswordCheckInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {!isConfirmPasswordValid && <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>}
                    </S.PasswordCheckContainer>


                    <S.NickNameContainer>
                        <S.NickNameLabel>닉네임</S.NickNameLabel>
                        <S.NickNameInputContainer>
                            <S.NickNameInput
                                type="text"
                                name="nickName"
                                value={memberNickName}
                                onChange={handleNicknameChange}
                                onKeyDown={(e) => e.key === 'Enter' && verifyNickname(e)}
                            />
                            <S.NickNameCheckButton onClick={verifyNickname}>
                                중복확인
                            </S.NickNameCheckButton>
                        </S.NickNameInputContainer>
                        {isNicknameValid && isNicknameChecked && <S.SuccessMessage>사용가능한 닉네임 입니다.</S.SuccessMessage>}
                        {!isNicknameValid && isNicknameChecked && <S.ErrorNickMessage>{nicknameError}</S.ErrorNickMessage>}
                    </S.NickNameContainer>
                    

                    <S.BirthContainer> 
                        <S.BirthLabel>생년월일</S.BirthLabel>
                        <S.BirthInput
                            type="date"
                            name="birth"
                            value={birth}
                            onChange={handleBirthChange}
                        />
                    </S.BirthContainer>

                    <S.GenderContainer>
                        <S.GenderLabel>성별</S.GenderLabel>
                        <S.SelectInput value={gender} onChange={handleGenderChange}>
                            <option value="">선택...</option>
                            <option value="남성">남성</option>
                            <option value="여성">여성</option>
                        </S.SelectInput>
                    </S.GenderContainer>
                    <S.ConfirmButton onClick={handleSubmit} disabled={!canSubmit}>완료</S.ConfirmButton>

                </S.ModalBody>
            </S.ModalContent>
        </S.ModalContainer>
    );
}

export default AdditionalInfoModal;
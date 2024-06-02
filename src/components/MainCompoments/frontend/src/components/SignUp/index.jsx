import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import closeBtn from "../../assets/close-icon.svg";
import SignComplete from "../SignComplete";
import { toast } from 'react-toastify';

const SignUpModal = (props) => {
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [timer, setTimer] = useState(180);
  const [showCertification, setShowCertification] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [emailAlreadyUseError, setEmailAlreadyUseError] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [certificationCode, setCertificationCode] = useState('');
  const [isCertificationCorrect, setIsCertificationCorrect] = useState(false);
  const [isCertificationWrong, setIsCertificationWrong] = useState(false); // 새로운 상태 추가
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isCodeExpired, setIsCodeExpired] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("비밀번호를 입력하십시오.");
  
  const emailInputRef = useRef(null);
  const certiInputRef = useRef(null);
  const emailButtonRef = useRef(null);
  const certiButtonRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const [nickname, setNickname] = useState('');
const [isNicknameValid, setIsNicknameValid] = useState(false);
const [nicknameError, setNicknameError] = useState('');

const [phoneNumber, setPhoneNumber] = useState('');

const [nameError, setNameError] = useState('');
const [phoneError, setPhoneError] = useState('');
const [birthDateError, setBirthDateError] = useState('');
const [genderError, setGenderError] = useState('');

const [isNicknameChecked, setIsNicknameChecked] = useState(false);


// 회원가입 버튼 활성화 조건
const canProceed = name && nickname && phoneNumber && birthDate && gender &&
                    !nameError && !nicknameError && !phoneError && !birthDateError && !genderError;

// 전화번호 입력 핸들러
const handlePhoneNumberChange = (event) => {
  setPhoneNumber(event.target.value);
};

const handleNicknameChange = (event) => {
  const newNickname = event.target.value;
  setNickname(newNickname);
  // 여기에 닉네임 유효성 검사 로직 추가 (예: 길이 제한)
};

const verifyNickname = async () => {
  setIsNicknameChecked(true);
  // 닉네임 인증 로직, 예를 들어 서버로 검증 요청을 보내고 응답을 처리
  try {
    const response = await fetch('http://localhost:8080/auth/verifyNickname', {
      method: 'POST',
      body:  nickname,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    const data = await response.json();
    console.log(data);
    if (!data) {
      setIsNicknameValid(true);
      setNicknameError('');
      console.log(isNicknameValid);
    } else {
      setIsNicknameValid(false);
      setNicknameError('사용중인 닉네임 입니다.');
    }
  } catch (error) {
    console.error('Failed to verify nickname:', error);
    setNicknameError('닉네임 인증 중 에러가 발생했습니다.');
  }
};

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

    // 비밀번호와 비밀번호 확인이 같은지 검사
    setIsConfirmPasswordValid(newConfirmPassword === password);
};

const validatePassword = () => {
  return password && isPasswordValid && confirmPassword && isConfirmPasswordValid;
};

const completeSignUp = () => {
  if (!validatePassword()) {
      toast.error("비밀번호 조건을 확인해주세요.");
      return;
  }
  setIsSignUpComplete(true);
};

  // 이메일 인증 코드 전송
  const sendEmail = async () => {
    if (validateEmail(emailInputRef.current.value)) {
      try {
        const response = await fetch("http://localhost:8080/auth/verifyEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: emailInputRef.current.value,
        });
        if (response.ok) {
          toast.success("이메일이 전송되었습니다");
          const { resultData } = await response.json(); // JSON 형식의 응답을 파싱
          setEmailCode(resultData);
          setIsEmailSent(true);
          setTimer(180);
          setShowCertification(true);
          // 형식 오류 초기화
          setEmailFormatError(false);
          // 이미 사용 중인 이메일 에러 초기화
          setEmailAlreadyUseError(false);
          setIsCodeExpired(false); // 코드 만료 상태를 초기화
        } else if (response.status === 400) {
          // 이미 사용 중인 이메일
          setEmailAlreadyUseError(true);
          // 형식 오류 초기화
          setEmailFormatError(false);
          setIsEmailSent(false); // 이메일 전송 실패로 설정
        } else {
          toast.error("이메일 전송에 실패했습니다");
          // 형식 오류 초기화
          setEmailFormatError(false);
          setEmailAlreadyUseError(false); // 이미 사용 중인 이메일 에러 초기화
          setIsEmailSent(false); // 이메일 전송 실패로 설정
        }
      } catch (error) {
        console.error("Failed to send verification email:", error);
        toast.error("이메일 전송에 실패했습니다");
        // 형식 오류 초기화
        setEmailFormatError(false);
        setEmailAlreadyUseError(false); // 이미 사용 중인 이메일 에러 초기화
        setIsEmailSent(false); // 이메일 전송 실패로 설정
      }
    } else {
      setEmailFormatError("올바르지 않은 이메일 형식입니다."); // 이메일 형식 오류 메시지 표시
      // 이미 사용 중인 이메일 에러 초기화
      setEmailAlreadyUseError(false);
      setIsEmailSent(false); // 이메일 전송 실패로 설정
    }
  };
  

  
  const handleSubmit = async (e) =>  {
    e.preventDefault();
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (emailInputRef && password) {
        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  
                  email: emailInputRef.current.value,
                  password: passwordInputRef.current.value,
                  name: name,
                  nickName: nickname,
                  phoneNum: phoneNumber,
                  birth: birthDate,
                  gender: gender
                  })
            });
            if (!response.ok) {
              toast.error('회원가입에 실패했습니다.');
                throw new Error('Network response was not ok.');
            }else{
              const { resultMsg } = await response.json();
              console.log('회원가입 성공:', resultMsg);
              toast.success(resultMsg);
              completeSignUp()
            }
        } catch (error) {
            console.error('에러 발생:', error);
            toast.error('회원가입에 실패했습니다.');
            // 회원가입 실패 시 모달 열고 메시지 표시
        }
    }
};


const validateEmail = (email) => {
  const re = /^\S+@(naver\.com|gmail\.com|daum\.net|nate\.com|outlook\.com)$/;
  return re.test(email);
};

  useEffect(() => {
    console.log(emailCode); // emailCode 값이 변경될 때마다 새로운 값 로그로 출력
  }, [emailCode]);

  useEffect(() => {
    let intervalId;
    if (isEmailSent && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // 타이머가 0이 되면 clearInterval을 호출하여 타이머를 멈춤
    if (timer === 0) {
      clearInterval(intervalId);
      setIsCodeExpired(true); // 코드 만료 상태를 설정
    }

    return () => clearInterval(intervalId);
  }, [isEmailSent, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetEmail = () => {
    setTimer(180); // 타이머 초기화
    setEmailCode(''); // 이메일 코드 초기화
    setCertificationCode(''); // 인증 코드 입력 필드 초기화
    setIsCertificationCorrect(false); // 인증 성공 상태 초기화
    setIsCertificationWrong(false); // 인증 실패 상태 초기화
    certiInputRef.current.disabled = false;
    certiButtonRef.current.disabled = false;
    setIsCodeExpired(false); // 코드 만료 상태 초기화
  };
  

  const handleCertificationCheck = () => {
    if (certificationCode === emailCode) {
      emailInputRef.current.disabled = true;
      emailButtonRef.current.disabled = true;
      certiInputRef.current.disabled = true;
      certiButtonRef.current.disabled = true;
      setIsCertificationCorrect(true);
      setIsCertificationWrong(false); // 인증 성공 시 인증 실패 상태를 초기화
    } else {
      setIsCertificationCorrect(false);
      setIsCertificationWrong(true); // 인증 실패 시 인증 실패 상태를 설정
    }
  };

  if (isSignUpComplete) {
    return <SignComplete onClose={props.onClose} />;
  }
  const isAllInfoEnteredAndNicknameValid = name && nickname && phoneNumber && birthDate && gender && isNicknameChecked && isNicknameValid;

  return (
    <S.SignUpContainer>
      <S.SignUpBox>
        <S.CloseButton src={closeBtn} onClick={props.onClose} />
        <S.Title>회원가입</S.Title>
        <S.TitleEmail>이메일</S.TitleEmail>
        <S.EmailInputButtonContainer>

          <S.EmailInput ref={emailInputRef} type="text" placeholder="" onChange={() => setEmailFormatError(false)} onKeyDown={(e) => e.key === 'Enter' && sendEmail(e)}/* 형식 오류 초기화*/ /> 

          {isEmailSent ? isCertificationCorrect ?   <S.EmailButton
          ref={emailButtonRef}
          onClick={sendEmail}
          >
          인증완료
        </S.EmailButton>
        : (
          <S.EmailButton
          ref={emailButtonRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={timer === 0 ? resetEmail : sendEmail}
        >
          {timer === 0 ? "재전송" : (
            hovered ? "재전송" : (
              <S.TimerText style={{ color: timer <= 60 ? "white" : "inherit" }}>
                {formatTime(timer)}
              </S.TimerText>
            )
          )}
        </S.EmailButton>
      ) : (
        <S.EmailButton
          ref={emailButtonRef}
          onClick={sendEmail}
        >
          이메일 인증
        </S.EmailButton>
      )}

        </S.EmailInputButtonContainer>
        {emailFormatError && (
          <S.EmailFormatError>올바르지 않은 이메일형식입니다.</S.EmailFormatError>
        )}
        {emailAlreadyUseError && (
          <S.EmailAlreadyUseError>사용중인 이메일입니다.</S.EmailAlreadyUseError>
        )}
        {isEmailSent && <S.EmailSended>인증 이메일을 전송하였습니다.</S.EmailSended>}
        {showCertification && (
          <S.CertificationContainer visible={showCertification ? "true" : "false"}>
            <S.TitleCerti>인증번호</S.TitleCerti>
            <S.CertiInputButtonContainer>
              <S.CertiInput 
                ref={certiInputRef}
                type="text" 
                placeholder="" 
                onChange={(e) => setCertificationCode(e.target.value)}
                disabled={isCodeExpired || isCertificationCorrect}
                onKeyDown={(e) => e.key === 'Enter' && handleCertificationCheck(e)}
              />
              <S.CertiButton 
                ref={certiButtonRef} 
                onClick={handleCertificationCheck} 
                disabled={isCodeExpired || isCertificationCorrect}
              >
                확인
              </S.CertiButton>
            </S.CertiInputButtonContainer>
            {isCertificationWrong && (
              <S.CertiError>인증번호가 틀렸습니다.</S.CertiError>
            )}
            {isCertificationCorrect && (
              <S.CertiRight>인증번호가 맞았습니다.</S.CertiRight>
            )}
            {isCodeExpired && !isCertificationCorrect && (
              <S.CertiCodeError>
                인증 코드가 만료되었습니다. 재전송 버튼을 눌러주세요.
              </S.CertiCodeError>
            )}
          </S.CertificationContainer>
        )}
        {isCertificationCorrect && (
          <S.PersonalInfoContainer>
            <S.InputGroup>
              <S.InputLabel>이름</S.InputLabel>
              <S.TextInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </S.InputGroup>
            
            <S.InputGroup>
              <S.InputNickname>닉네임</S.InputNickname>
              <S.TextInput2
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                onKeyDown={(e) => e.key === 'Enter' && verifyNickname(e)}
              />
              <S.NicknameButton onClick={verifyNickname}>중복 확인</S.NicknameButton>
            </S.InputGroup>
            {isNicknameValid && isNicknameChecked && (
              <S.NickNameRight>사용가능한 닉네임 입니다.</S.NickNameRight>
            )}
            {!isNicknameValid && isNicknameChecked && (
              <S.CertiNickError>{nicknameError}</S.CertiNickError>
            )}
            <S.InputGroup>
              <S.InputNumber type="number">전화번호</S.InputNumber>
              <S.TextInput
                type="tel" // 전화번호에 맞는 input 타입 설정
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                // 필요하다면 전화번호 형식을 지정하는 pattern 속성 사용
                // pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
                placeholder="01012345678" // 사용자에게 입력 형식을 알려줄 수 있는 플레이스홀더 추가
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.InputBirth>생년월일</S.InputBirth>
              <S.DateInput
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.InputSex>성별</S.InputSex>
              <S.SelectInput value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">선택...</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </S.SelectInput>
            </S.InputGroup>
            {name && birthDate && gender && phoneNumber && isNicknameValid && (
              <S.BottomContainer>
                  
                    <S.PasswordContainer>
                      <S.TitlePassword>비밀번호</S.TitlePassword>
                      
                      <S.PasswordInput type="password" placeholder="" ref={passwordInputRef} onKeyUp={handlePasswordChange} />
                      {passwordError && <S.PasswordError1>{passwordError}</S.PasswordError1>}
                    </S.PasswordContainer>
                    <S.TitleCheck>비밀번호 확인</S.TitleCheck>
                    <S.CheckInput type="password" placeholder="" onChange={handleConfirmPasswordChange} onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}/>
                    {!isConfirmPasswordValid && <S.CheckError>비밀번호가 일치하지 않습니다.</S.CheckError>}
                    <S.SignButton onClick={handleSubmit} disabled={!canProceed}>회원가입</S.SignButton>
                  
              </S.BottomContainer>
            )}
          </S.PersonalInfoContainer>
        )}
      </S.SignUpBox>
    </S.SignUpContainer>
  );
};

export default SignUpModal;
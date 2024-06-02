import styled, { css, keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }
  100% {
    opacity: 1;
    max-height: 500px; /* 충분히 커버할 수 있는 최대 높이, 실제 내용에 맞게 조정 필요 */
    overflow: visible;
  }
`;
export const SignUpContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const SignUpBox = styled.div`
    min-height: 200px;
    position: relative;
    background-color: #fff;
    padding: 45px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CloseButton = styled.img`
    margin : 0;
    width:20px;
    position: absolute;
    top: 25px;
    right: 20px;
    transition: filter 0.3s ease;
    cursor: pointer;

    &:hover {
        filter: brightness(0.8) !important;
    }
`;

export const Title = styled.h1`
    margin-bottom: 1rem;
    color: #333;
    font-weight: normal;
`;

export const Text = styled.h1`
    margin-bottom: 0rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const EmailAlreadyUseError = styled.h1`
    margin-top:-1rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 10.3rem;
`;
export const EmailFormatError = styled.h1`
    margin-top:-1rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 7.8rem;
`;


export const ExpiredMessage = styled.span`
    display: block;
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 6.3rem;
`;



export const EmailSended = styled.h1`
    margin-top: -1.4em;
    margin-bottom: 0rem;
    color: green;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 8.4rem;
`;


export const CertiError = styled.h1`
    position: absolute;
    top: 257px;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 1.6rem;
`;

export const CertiCodeError = styled.h1`
    position: absolute;
    top: 257px;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 1.6rem;
`;

export const CertiNickError = styled.h1`
    position: absolute;
    top: 405px;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 1.6rem;
`;

export const PasswordError1 = styled.h1`
    position: absolute;
    top: 36px;
    margin-top: 1.1rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 5rem;
`;

export const PasswordLengthError = styled.h1`
    margin-top: 1.2rem;
    margin-bottom: 0rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 5rem;
`;

export const CheckError = styled.h1`
    top: 115px;
    position: absolute;
    margin-top: 0.8rem;
    margin-bottom: -1rem;
    color: red;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 7.2rem;
`;


export const CertiRight = styled.h1`
    margin-top: 1rem;
    margin-bottom: 0rem;
    color: green;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 9.6rem;
`;

export const TitleEmail = styled.h1`
    margin-bottom: -1.8rem;
    margin-right: 14.3rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`;

export const TitleCerti = styled.h1`
    margin-top: 2px;
    margin-bottom: -1.8rem;
    margin-right: 13rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`;

export const TitlePassword = styled.h1`
    margin-top: -3px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
    margin-bottom: -30px;
`;

export const TitleCheck = styled.h1`
    margin-top: 30px;
    margin-bottom: 0rem;
    margin-right: 11.6rem;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
    text-align: left;
`;

export const EmailInput = styled.input`
    width: 130px;
    padding: 10px;
    margin-bottom: -1rem;
    margin-right: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const CertiInput = styled.input`
    width: 150px;
    padding: 10px;
    margin-bottom: -1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 1rem;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const PasswordInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: -1rem;
    border-radius: 4px;
    margin-top: 30px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const CheckInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: -1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

const slideDownCertification = keyframes`
  from {
    height: 0;
    display: none;
    opacity: 0;
  }
  to {
    height: 100px;
    display: block;
    opacity: 1;
  }
`;
const slideDownBottom = keyframes`
  from {
    height: 0;
    display: none;
    opacity: 0;
  }
  to {
    height: 230px;
    display: block;
    opacity: 1;
  }
`;

export const CertificationContainer = styled.div`
    animation: ${({ visible }) => visible ? css`${slideDownCertification} 0.5s ease-out forwards` : "none"};
`;

export const BottomContainer = styled.div`
    animation: ${({ visible }) => visible ? css`${slideDownBottom} 0.5s ease-out forwards` : "none"};
    position: relative;
    overflow: hidden;
`;


export const EmailInputButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 270px;
`;

export const EmailButton = styled.button`
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background-color: var(--primary-color);

    color: white;
    margin-bottom: 1rem;
    margin-top: 2rem;
    margin-left: -9rem;
    cursor: pointer;
    transition: filter 0.3s ease;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
    &:disabled{
        background-color: #dfdddd;
        color: #a7a7a7;
    }
`;

export const CertiButton = styled.button`
    width: 80px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background-color: var(--primary-color);
    color: white;
    margin-bottom: 1rem;
    margin-top: 2rem;
    margin-left: -10rem;
    cursor: pointer;
    transition: filter 0.3s ease;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
    &:disabled{
        background-color: #dfdddd;
        color: #a7a7a7;
    }
`;

export const SignButton = styled.button`
    width: 270px;
    padding: 10px;
    border: none;
    margin-top: 30px;
    border-radius: 30px;
    background-color:  var(--primary-color);
    color: white;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: filter 0.3s ease;
    display:block;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
`;

export const PasswordContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    margin-top: 2px;
    background-color: #fff;
    animation: ${slideDown} 0.5s ease-out forwards; // 애니메이션 적용
`;



export const CertiInputButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 270px;
    margin-bottom: -2rem;
`;

export const QuestionMark = styled.span`
    background-color: #e8e8e8;
    border-radius: 50%;
    padding: 0 6px;
    cursor: pointer;
    position: relative;
    display: inline-block;
    margin-left: 4rem;
    margin-top: 10px;
    margin-bottom: 3px;
`;

export const Tooltip = styled.span`
    visibility: hidden;
    width: 280px;
    font-size: 0.8rem;
    background-color: #e8e8e8;
    color: black;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 3;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
    
    /* 툴팁 화살표 */
    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #e8e8e8 transparent transparent transparent;
    }

    /* QuestionMark의 상태에 따라 표시되는 툴팁 */
    ${QuestionMark}:hover & {
        visibility: visible;
    }
`;


export const TimerText = styled.span`
  color: #333;
  font-size: 0.7rem;
  font-weight: normal;
`;


export const PersonalInfoContainer = styled.div`
  width: 100%;
  animation: ${slideDown} 1s ease-out forwards;
  overflow: hidden;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 2px;
  margin-top: -23px;
`;

export const InputNickname = styled.label`
  display: block;
  margin-bottom: 2px;
  margin-top: -3px;
`;

export const InputNumber = styled.label`
  display: block;
  margin-bottom: 2px;
  margin-top: -0px;
`;

export const InputBirth = styled.label`
  display: block;
  margin-bottom: 2px;
  margin-top: -2px;
`;

export const InputSex = styled.label`
  display: block;
  margin-bottom: 2px;
  margin-top: -2px;
`;

export const TextInput = styled.input`
  width: 250px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const NickNameRight = styled.h1`
    position: absolute;
    top:405px;
    margin-bottom: 0rem;
    color: green;
    font-size: 0.7rem;
    font-weight: normal;
    text-align: left;
    margin-right: 9.6rem;
`;

export const TextInput2 = styled.input`
  width: 130px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const NicknameButton = styled.button`
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background-color: var(--primary-color);

    color: white;
    margin-bottom: 0rem;
    margin-top: 0rem;
    margin-left: 1rem;
    cursor: pointer;
    transition: filter 0.3s ease;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
    &:disabled{
        background-color: #dfdddd;
        color: #a7a7a7;
    }
`;



export const SelectInput = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;


export const DateInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box; // 너비 계산에 padding과 border를 포함
  &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;
import React, { useState } from 'react';
import './Modal.css';
import X from "../../assets/fx.svg"
import {toast} from "react-toastify";
import {useCookieManager} from "../../customHook/useCookieManager"

// 국가번호 리스트 (필요에 따라 확장 가능)
const countryCodes = [
  { code: 'KR', number: '+82' },
  { code: 'US', number: '+1' },
  { code: 'JP', number: '+81' },
  { code: 'CN', number: '+86' },
  { code: 'GB', number: '+44' },
  { code: 'DE', number: '+49' },
  { code: 'FR', number: '+33' },
  // 추가적인 국가 코드들...
];

// Modal 컴포넌트 정의
const Modal = ({ isOpen, onClose }) => {
  // 상태 변수 정의
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+82'); // 기본 국가번호 설정
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const {getCookies}=useCookieManager();

  // isOpen이 false이면 모달을 보여주지 않음
  if (!isOpen) return null;

  // 이름 입력 시 상태 업데이트
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setName(value);
    }
  };

  // 전화번호 입력 시 상태 업데이트 및 유효성 검사
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const handleAddFriendButton=()=>{
    const fullPhoneNumber = `${countryCode}${phone}`.replace('+', '');
    const accessToken = getCookies().accessToken;

    fetch('http://localhost:8080/friend/newFriend',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${accessToken}`
      },
      body:JSON.stringify({ name,fullPhoneNumber })
    })
    .then(response=>{
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data=>{
      toast.success("친구가 성공적으로 추가되었습니다.");
      onClose();
    })
    .catch(error=>{
      toast.error("친구 추가에 실패했습니다.",{
        position:"top-center"
      });
    })


  }
  
  // 국가번호 변경 시 상태 업데이트
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  // JSX 반환
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>친구추가</span>
          <img src={X} className='f-x' onClick={onClose} />
        </div>
        <div className="modal-body">
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <div className="name-input-wrapper">
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                maxLength="20"
                className="inputline1"
                value={name}
                onChange={handleNameChange}
              />
              <span className="char-counter">{name.length}/20</span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phone">전화번호</label>
            <div className="phone-inputs">
              <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="inputline2"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.number}>
                    {country.code} {country.number}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="phone"
                className="inputline3"
                placeholder="전화번호를 입력하세요"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            {phoneError && (
              <span className="error-message">숫자를 입력해주세요</span>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="add-button" onClick={handleAddFriendButton} >친구추가</button>
        </div>
      </div>
    </div>
  );
};

// Modal 컴포넌트를 외부로 내보냄
export default Modal;
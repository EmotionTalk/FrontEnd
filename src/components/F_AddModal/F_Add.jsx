import React, { useState } from 'react';
import './Modal.css';
import X from "../../assets/fx.svg"
import {toast} from "react-toastify";
import {useCookieManager} from "../../customHook/useCookieManager"

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

const Modal = ({ isOpen, onClose, onFriendAdded }) => {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+82'); // 기본 국가번호 설정
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const { getCookies } = useCookieManager();

  if (!isOpen) return null;

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setName(value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const handleAddFriendButton = async () => {
    let sanitizedPhone = phone;
    let result;
    if (sanitizedPhone.startsWith('0')) {
        sanitizedPhone = sanitizedPhone.substring(1);
    }
    const fullPhoneNumber = `${countryCode}${sanitizedPhone}`.replace('+', '');
    const accessToken = getCookies().accessToken;

    try {
      const response = await fetch('http://localhost:8080/friend/newFriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ name, fullPhoneNumber })
      });
      result = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      toast.success(result.resultMsg);
      onClose();
      onFriendAdded(); // 친구 추가 후 부모 컴포넌트에게 알림
    } catch (error) {
      toast.error(result.resultMsg, {
        position: "top-center"
      });
    }
  }

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>친구추가</span>
          <img src={X} className='f-x' onClick={onClose} alt='X'/>
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

export default Modal;

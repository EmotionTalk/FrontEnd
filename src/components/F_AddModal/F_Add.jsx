import React, { useState } from 'react';
import './Modal.css';
import X from "../../assets/fx.svg"

// Modal 컴포넌트 정의
const Modal = ({ isOpen, onClose }) => {
  // 상태 변수 정의
  const [name, setName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  // isOpen이 false이면 모달을 보여주지 않음
  if (!isOpen) return null;

  // 이름 입력 시 상태 업데이트
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 전화번호 입력 시 상태 업데이트 및 유효성 검사
  const handlePhoneChange = (e, setPhone) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
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
                className="input-line"
                value={name}
                onChange={handleNameChange}
              />
              <span className="char-counter">{name.length}/20</span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phone1">전화번호</label>
            <div className="phone-inputs">
              <input
                type="text"
                id="phone1"
                maxLength="3"
                className="input-line"
                placeholder="000"
                value={phone1}
                onChange={(e) => handlePhoneChange(e, setPhone1)}
              />
              <input
                type="text"
                id="phone2"
                maxLength="4"
                className="input-line"
                placeholder="0000"
                value={phone2}
                onChange={(e) => handlePhoneChange(e, setPhone2)}
              />
              <input
                type="text"
                id="phone3"
                maxLength="4"
                className="input-line"
                placeholder="0000"
                value={phone3}
                onChange={(e) => handlePhoneChange(e, setPhone3)}
              />
            </div>
            {phoneError && (
              <span className="error-message">숫자를 입력해주세요</span>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="add-button">친구추가</button>
        </div>
      </div>
    </div>
  );
};

// Modal 컴포넌트를 외부로 내보냄
export default Modal;

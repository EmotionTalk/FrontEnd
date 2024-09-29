import React from 'react';
import X from "../../assets/fx.svg";
import sendIcon from "../../assets/send.svg"; 
import './RecordResultModal.css';

const RecordResultModal = ({ show, onClose, resultText, onSend }) => {
  if (!show) return null; // show 상태가 false이면 모달을 렌더링하지 않음

  return (
    <div className="record-result-modal-overlay">
      <div className="record-result-modal" onClick={(e) => e.stopPropagation()}>
        <img src={X} className='rx' onClick={onClose} alt="close" />
        <h2>Recording Result</h2>
        <p>{resultText}</p> {/* 전달받은 텍스트 표시 */}
        
        {/* 전송 버튼 추가 */}
        <div className="send-button-container">
          <button className="send-button" onClick={onSend}>
            <img src={sendIcon} alt="send" className="send-icon" /> {/* send.svg 삽입 */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordResultModal;

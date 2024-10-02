import React from "react";
import "./RecordResultForMeModal.css";
import X from "../../assets/fx.svg";
import sendIcon from "../../assets/send.svg";

const RecordResultForMeModal = ({ openAIResult, emotionResult, onClose, onSend}) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>지금 당신의 감정은?</h2>
          <img src={X} className='rx' onClick={onClose} alt="close" />
        </div>

        {/* 모달 본문 */}
        <div className="modal-content">
        {/* 감정 예측 결과 */}
        <h3 className="section-title">감정 예측 결과</h3>
        <div className="result-section emotionresult">
          <p>{emotionResult ? emotionResult.join(", ") : "예측 결과가 없습니다."}</p>
        </div>

        {/* OpenAI 분석 결과 */}
        <h3 className="section-title">OpenAI 분석 결과</h3>
        <div className="result-section open">
          <p>{openAIResult ? JSON.stringify(openAIResult, null, 2) : "분석 결과가 없습니다."}</p>
        </div>
      </div>



         {/* 전송 버튼 */}
         <div className="send-button-container">
          <button className="send-button" onClick={onSend}>
            <img src={sendIcon} alt="send" className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordResultForMeModal;
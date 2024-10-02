import React from "react";
import "./RecordResultForMeModal.css";
import CloseIcon from "../../assets/kakao_logo.png";

const RecordResultForMeModal = ({ openAIResult, emotionResult, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>분석 결과</h2>
          <img src={CloseIcon} className="close-icon" onClick={onClose} alt="닫기" />
        </div>

        {/* 모달 본문 */}
        <div className="modal-content">
          {/* OpenAI 분석 결과 */}
          <div className="result-section">
            <h3>OpenAI 분석 결과</h3>
            <p>{openAIResult ? JSON.stringify(openAIResult, null, 2) : "분석 결과가 없습니다."}</p>
          </div>

          {/* 감정 예측 결과 */}
          <div className="result-section">
            <h3>감정 예측 결과</h3>
            <p>{emotionResult ? emotionResult.join(", ") : "예측 결과가 없습니다."}</p>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="modal-footer">
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordResultForMeModal;
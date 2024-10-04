import React from "react";
import "./RecordResultForMeModal.css";
import X from "../../assets/fx.svg";
import sendIcon from "../../assets/send.svg";

// 감정에 해당하는 아이콘들
import Angry from "../../assets/angry.svg";
import Sad from "../../assets/sad.svg";
import Dislike from "../../assets/dislike.svg";
import Ordinary from "../../assets/ordinary.svg";
import Happy from "../../assets/happy.svg";
import Awe from "../../assets/awe.svg";
import No from "../../assets/noresult.svg";

// 숫자에 따른 감정 매핑 객체
const emotionMapping = {
  0: { emotion: "화남", icon: Angry },
  1: { emotion: "두려움", icon: Awe },
  2: { emotion: "슬픔", icon: Sad },
  3: { emotion: "싫어함", icon: Dislike },
  4: { emotion: "평범함", icon: Ordinary },
  5: { emotion: "행복함", icon: Happy }
};

const RecordResultForMeModal = ({ openAIResult, emotionResult, transcript, onClose, onSend }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2>지금 당신의 감정은?</h2>
          <img src={X} className="rx" onClick={onClose} alt="close" />
        </div>

        {/* 모달 본문 */}
        <div className="modal-content">
          {/* 감정 예측 결과 */}
          <div className="result-section emotionresult">
            {emotionResult !== undefined && emotionResult in emotionMapping ? (
              <div className="emotion-item">
                <img
                  src={emotionMapping[emotionResult].icon}
                  alt={emotionMapping[emotionResult].emotion}
                  className="emotion-icon"
                />
                <p className="emotion-text">
                  지금은 {emotionMapping[emotionResult].emotion} 감정입니다
                </p>
              </div>
            ) : (
              <div>
                <img src={No} alt="No result" className="no-result-icon" />
                <p className="no-result-text">감정 결과가 없습니다.</p>
              </div>
            )}
          </div>

          {/* 실시간 음성 인식 텍스트 - 감정 예측 결과 밑에 배치 */}
          <h3 className="section-title">음성 결과</h3>
          {transcript && (
            <div className="transcript-section">
              <p>{transcript}</p>
            </div>
          )}

          {/* OpenAI 분석 결과 */}
          <h3 className="section-title">OpenAI 분석 결과</h3>
          <div className="result-section open">
            <p>{openAIResult ? JSON.stringify(openAIResult, null, 2) : "분석 결과가 없습니다."}</p>
          </div>
        </div>

        {/* 전송 버튼 */}
        <div className="send-button-container">
          <button
            className="send-button"
            onClick={() => {
              onSend(transcript);  // `onSend` 호출로 `Chat`에 데이터 전송
              onClose();           // `onClose` 호출로 `RecordModal` 닫기
            }}
          >
            <img src={sendIcon} alt="send" className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordResultForMeModal;

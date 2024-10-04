import React from 'react';
import './RecordResultModal.css';
import X from "../../assets/fx.svg";

// 감정에 해당하는 아이콘들
import Angry from "../../assets/angry.svg";
import Sad from "../../assets/sad.svg";
import Dislike from "../../assets/dislike.svg";
import Ordinary from "../../assets/ordinary.svg";
import Happy from "../../assets/happy.svg";
import Awe from "../../assets/awe.svg";
import No from "../../assets/noresult.svg"; // 결과 없음 아이콘

const RecordResultModal = ({ show, onClose, emotion, resultText, openAIResult }) => {
  // 감정 매핑
  const emotionMapping = {
    0: { icon: Angry, emotion: '화가 났어요' },
    1: { icon: Awe, emotion: '두려워하고 있어요' },
    2: { icon: Sad, emotion: '슬퍼하고 있어요' },
    3: { icon: Dislike, emotion: '싫어하고 있어요' },
    4: { icon: Ordinary, emotion: '아무런 감정을 안 느끼고 있어요' },
    5: { icon: Happy, emotion: '행복해하고 있어요' }
  };

  const currentEmotion = emotionMapping[emotion] || {};

  return (
    <div className={show ? 'record-result-modal-overlay' : 'hidden'} onClick={onClose}>
      <div className="record-result-modal" onClick={(e) => e.stopPropagation()}>
        {/* 모달 닫기 버튼 */}
        <img src={X} className='rx' onClick={onClose} alt="close" />

        {/* 모달 본문 */}
        <div className="modal-content">
          {/* 감정 아이콘과 텍스트 */}
          <div className="emotion-section">
            {emotion !== undefined && emotion in emotionMapping ? (
              <div className="emotion-item">
                <img
                  src={currentEmotion.icon}
                  alt={currentEmotion.emotion}
                  className="emotion-icon"
                />
                <p className="emotion-text">
                  지금은 {currentEmotion.emotion} 감정입니다
                </p>
              </div>
            ) : (
              <div>
                <img src={No} alt="No result" className="no-result-icon" />
                <p className="no-result-text">감정 결과가 없습니다.</p>
              </div>
            )}
          </div>

          {/* 실시간 음성 인식 텍스트 */}
          <h3 className="section-title">음성 결과</h3>
          {resultText && (
            <div className="transcript-section">
              <p>{resultText}</p>
            </div>
          )}

          {/* OpenAI 분석 결과 */}
          <h3 className="section-title">OpenAI 분석 결과</h3>
          <div className="result-section open">
            <p>{openAIResult ? JSON.stringify(openAIResult, null, 2) : "분석 결과가 없습니다."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordResultModal;

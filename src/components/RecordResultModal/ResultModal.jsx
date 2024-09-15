// import React from 'react';
// import './ResultModal.css';
// import X from "../../assets/fx.svg";
// // 화남
// import Angry from "../../assets/angry.svg" 
// // 행복함
// import Happy from "../../assets/happy.svg"
// // 두려움
// import Awe from "../../assets/awe.svg"
// // 싫어함
// import Dislike from "../../assets/dislike.svg"
// // 슬픔
// import Sad from "../../assets/sad.svg"
// // 평범함
// import Ordinary from "../../assets/ordinary.svg"

// // 감정은 총 6가지로 두려움, 슬픔, 싫어함, 평범함, 행복함, 화남이 있음 

// const ResultModal = ({ show, onClose }) => {
//   return (
//     <div className={show ? 'modal-overlay1' : 'hidden'} onClick={onClose}>
//       <div className="modal1" onClick={(e) => e.stopPropagation()}>
//         <img src={X} className='rx' onClick={onClose} />
//         <div className="modal-header1">
//         <img src={Happy} className="emo" alt="Emotion" />
//         </div>
//         <div className="modal-body1">
//           <p>지금은 화난 상태에요.</p>
//           <p>"먼저, 제가 오늘 회의에 말도 없이 참석하지 않은 점 정말 죄송합니다. 
//             회의 참석이 중요한데 제가 그 점을 소홀히 한 것 같습니다. 
//             무슨 이유에서든 미리 말씀드리지 못한 점 사과드리며, 
//             앞으로는 이런 일이 발생하지 않도록 주의하겠습니다. 
//             오늘 회의에서 논의된 내용이나 제가 놓친 부분에 대해 알려주시면 감사하겠습니다."
//             라고 말씀해보세요. 상대방이 이해해주고 화가 사라지도록 솔직하고 죄송한 마음을 전해보세요.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import './ResultModal.css';
import X from "../../assets/fx.svg";

// 감정에 해당하는 아이콘들
import Angry from "../../assets/angry.svg";
import Sad from "../../assets/sad.svg";
import Dislike from "../../assets/dislike.svg";
import Ordinary from "../../assets/ordinary.svg";
import Happy from "../../assets/happy.svg";
import Awe from "../../assets/awe.svg";

const ResultModal = ({ show, onClose, emotion, userMessage, aiSuggestion }) => {
  const emotionMapping = {
    0: { icon: Angry, text: '화남' },
    1: { icon: Sad, text: '슬픔' },
    2: { icon: Dislike, text: '싫어함' },
    3: { icon: Ordinary, text: '평범함' },
    4: { icon: Happy, text: '행복함' },
    5: { icon: Awe, text: '두려움' }
  };

  const currentEmotion = emotionMapping[emotion] || {};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiSuggestion)
      .then(() => {
        alert("답변이 클립보드에 복사되었습니다.");
      })
      .catch(err => {
        console.error("복사 실패:", err);
      });
  };

  return (
    <div className={show ? 'modal-overlay1' : 'hidden'} onClick={onClose}>
      <div className="modal1" onClick={(e) => e.stopPropagation()}>
        <img src={X} className='rx' onClick={onClose} />
        
        <div className="modal-header1">
          <img src={currentEmotion.icon} className="emo" alt={currentEmotion.text} />
        </div>
        
        <div className="modal-body1">
          <p>현재 감정 상태는 <strong>{currentEmotion.text}</strong> 입니다.</p>
          
          <div className="user-message">
            <p><strong>상대방 메시지:</strong></p>
            <p>{userMessage}</p>
          </div>

          <div className="ai-suggestion">
            <p className="suggestion-title">답변 예시입니다:</p>
            <p className="suggestion-content">{aiSuggestion}</p>
          </div>
        </div>

        <div className="modal-footer1">
          <button className="copy-btn" onClick={copyToClipboard}>답변 복사하기</button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;





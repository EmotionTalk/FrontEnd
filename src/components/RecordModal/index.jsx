import React from "react";
import "./prestyle.css";
import { useCallback, useEffect, useRef, useState } from "react";
import RecordIcon from "../../assets/record_icon.png";
import StopIcon from "../../assets/stop_icon.png";
import PlayIcon from "../../assets/play_icon.png";
import PauseIcon from "../../assets/pause_icon.png";
import ResetIcon from "../../assets/reset_icon.png";
import SendIcon from "../../assets/send_white_icon.png";
import {toast} from "react-toastify";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

const RecordModal=({closeRecordModal, sendAudioFile})=>{
    const [isRecording,setIsRecording]=useState(false); // 녹음 중인지 여부
    const [isRecorded,setIsRecorded]=useState(false); // 녹음 완료 여부
    const [isPlaying,setIsPlaying]=useState(false); // 오디오 재생 중인지 여부
    const [media,setMedia]=useState(null); // MediaRecorder 객체
    const [audioUrl,setAudioUrl]=useState(null); // 녹음된 오디오 파일 URL
    const [recordedTime, setRecordedTime]=useState(0); // 녹음된 시간
    const audioRef=useRef(null); // 오디오 요소 참조
    const {transcript, resetTranscript}=useSpeechRecognition(); // 음성인식 결과 저장
    const [emotion,setEmotion]=useState(null); // 감정 분석 결과
    const [isEmotionConfirmModalOpen,setIsEmotionConfirmModalOpen]=useState(false); // 감정 확인 모달 창 표시

    const sendTranscriptToBackend=async(transcript)=>{
        try{
            const response=await fetch()
        }
    }

    useEffect(()=>{
        // 녹음 중 시간 기록 타이머
        let intervalId;
        if (isRecording){
            intervalId=setInterval(()=>{
                setRecordedTime((prevTime)=>prevTime+1);
            },1000); // 1초마다 recordedTime 1씩 증가
        }
        else{
            clearInterval(intervalId) // 녹음 중 아니면 타이머 정리
        }

        return ()=>clearInterval(intervalId); // 모달창 닫으면 타이머 정리
    },[isRecording]);

    // 시간 "MM:SS" 형식으로 변환
    const formatTime=(time)=>{
        const minutes=Math.floor(time/60);
        const seconds=time%60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // 마이크 접근 권한 요청 및 녹음
    const onRecordAudio=()=>{
        navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
            const mediaRecorder=new MediaRecorder(stream);
            mediaRecorder.start();
            setMedia(mediaRecorder);

            // 녹음된 데이터 준비 시 실행
            mediaRecorder.ondataavailable=(e)=>{
                setAudioUrl(URL.createObjectURL(e.data));
            }

            // 녹음 중지 시 실행
            mediaRecorder.onstop=()=>{
                stream.getAudioTracks().forEach((track)=>track.stop());
                setIsRecorded(true);
                setIsRecording(false);
                SpeechRecognition.stopListening(); // 음성인식 중지
            }

            setIsRecording(true);
            resetTranscript(); // 이전 음성 인식 결과 초기화
            SpeechRecognition.startListening({continuous:true}); // 음성인식 시작
        })
    }

    // 녹음 중지
    const offRecordAudio=()=>{
        if(media){
            media.stop()
        }
    }

    // 녹음 버튼 클릭
    const handleRecordBtn=()=>{
        if(isRecording){
            offRecordAudio();
        }
        else{
            onRecordAudio();
        }
    }

    // 재생 및 일시 정지 버튼
    const handlePlayback=()=>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause(); // 재생 중이면 일시 정지
                setIsPlaying(false);
            }
            else{
                audioRef.current.play(); // 재생 중 아니면 시작
                setIsPlaying(true);
            }
        }
    }

    // 오디오 재생 끝났을 때
    const handlePlaybackEnded=()=>{
        setIsPlaying(false);
    };

    // 녹음 초기화 버튼
    const handleResetRecord=()=>{
        setIsRecorded(false);
        setAudioUrl(null);
        setRecordedTime(0);
        setIsPlaying(false);
        resetTranscript(); // 음성인식 결과 초기화
    }
    
    // transcript 백엔드 전송
    const sendTranscript=async()=>{
        try{
            await sendTranscriptToBackend(transcript);;
            toast.success("Transcript가 성공적으로 전송되었습니다.");
        } catch(error){
            toast.error("Transcript 전송에 실패했습니다.");
        }
    }

    // audio file AI서버로 전송, 감정 분석 결과 받기
    const sendAudioToAI=async()=>{
        try{
            const response=await fetch(aiEmotionUrl,{
                method:"POST",
                headers:{
                    "Content-Type":"audio/wav",
                },
                body:audioUrl,
            });

            if(!response.ok){
                throw new Error("AI 서버 오류");
            }

            const data=await response.json();
            setEmotion(data.emotion); // 감정 저장
            setIsEmotionConfirmModalOpen(true);
        } catch(error){
            toast.error("AI 감정 분석에 실패했습니다.")
        }
    }

    // 감정, audio file 백엔드 전송
    const handleConfirmEmotion=async()=>{
        try{
            await sendEmotionToBackend({emotion,audioFile:audioUrl});
            toast.success("감정과 오디오 파일이 성공적으로 전송되었습니다.");
            closeRecordModal();
        } catch(error){
            toast.error("최종 전송에 실패했습니다.");
        }
    }

    // 전송 버튼 클릭
    const handleSendAudio=useCallback(async()=>{
        await sendTranscript();
        await sendAudioToAI();
    }, [audioUrl,transcript]);

 
    const getRecordButtonClass=()=>{
        if(isRecording) return "RecordStopButton"
        if (isRecorded) return "RecordResetButton"
        return "RecordStartButton";
    }

    return(
        <div className="RecordModalBack" onClick={closeRecordModal}>
            <div className="RecordModalContainer" onClick={(e)=>e.stopPropagation()}>
                <p>음성 메시지</p>
                <div className="AudioDisplay">
                    {isRecorded ? (
                        <>
                            {/* 재생 및 일시정지 버튼 */}
                            <img src={isPlaying ? PauseIcon : PlayIcon}
                                className="PlayButton"
                                onClick={handlePlayback}
                                alt="Play/Pause"/>
                            {/* 녹음된 시간 표시 */}
                            <span>{formatTime(recordedTime)}</span>
                        </>
                    ) : (
                        // 녹음전 or 녹음 중
                        <span>{isRecording ? "녹음 중..." : "00:00"}</span>
                    )}
                </div>
                {/* 실시간 음성인식 텍스트 표시 */}
                {isRecording && (
                    <div className="Transcript">
                        <p>{transcript}</p>
                    </div>
                )}
                <div className="ButtonBox">
                    {/* 취소 */}
                    <button className="CancelButton" onClick={closeRecordModal}>취소</button>
                    {/* 녹음 / 중지 / 재녹음 */}
                    <img src={isRecording ? StopIcon : isRecorded ? ResetIcon : RecordIcon}
                        // className={`Record ${isRecording ? 'active':''}`}
                        className={getRecordButtonClass()}
                        onClick={isRecorded ? handleResetRecord : handleRecordBtn}
                        alt="녹음"/>
                    {/* 전송 */}
                    <img src={SendIcon}
                    className="SendButton"
                    onClick={handleSendAudio}
                    alt="전송"
                    disabled={!isRecorded}
                    style={{
                        opacity:isRecorded ? 1:0.5,
                        pointerEvents:isRecorded ? "auto" : "none",
                    }}/>
                </div>
                {audioUrl && (
                    <audio ref={audioRef}
                        src={audioUrl}
                        onEnded={handlePlaybackEnded}
                        style={{display:"none"}}
                        controls/>
                )}

                {/* 감정 확인 모달 */}
                {isEmotionConfirmModalOpen && (
                    <div className="EmotionConfirmModal">
                        <p>감정분석결과:{emotion}</p>
                        <button onClick={handleConfirmEmotion}>확인</button>
                    
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecordModal
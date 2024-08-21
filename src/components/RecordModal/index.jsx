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

const RecordModal=({closeRecordModal, sendAudioFile})=>{
    const [isRecording,setIsRecording]=useState(false); // 녹음 중인지 여부
    const [isRecorded,setIsRecorded]=useState(false); // 녹음 완료 여부
    const [isPlaying,setIsPlaying]=useState(false); // 오디오 재생 중인지 여부
    const [media,setMedia]=useState(null); // MediaRecorder 객체
    const [audioUrl,setAudioUrl]=useState(null); // 녹음된 오디오 파일 URL
    const [recordedTime, setRecordedTime]=useState(0); // 녹음된 시간
    const audioRef=useRef(null); // 오디오 요소 참조

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
            }

            setIsRecording(true);
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
    }
    

    // 녹음된 오디오 파일 전송 버튼
    const handleSendAudio=useCallback(()=>{
        if(audioUrl){
            fetch(audioUrl)
                // 오디오 파일 Blob 객체로 가져옴
                .then((res)=>res.blob())
                // Blob 객체 File로 변환
                .then((blob)=>{
                    const audioFile=new File([blob],"audio_message.wav",{
                        type:"audio/wav",
                        lastModified:new Date(),
                    });
                    return sendAudioFile(audioFile); // 서버로 전송
                })
                .then(() => {
                    toast.success("오디오 파일이 성공적으로 전송되었습니다.");
                    closeRecordModal();
                })
                .catch(() => {
                    toast.error("오디오 파일 전송에 실패했습니다.");
                    closeRecordModal();
                });
        }
    },[audioUrl,closeRecordModal,sendAudioFile])

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
            </div>
        </div>
    )
}

export default RecordModal
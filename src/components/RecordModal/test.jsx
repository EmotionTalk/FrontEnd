import React, { useCallback, useState, useRef, useEffect } from "react";
import "./style2.css";
import RecordIcon from "../../assets/record_icon.png"
import StopIcon from "../../assets/stop_icon.png"
import PlayIcon from "../../assets/play_icon.png"
import PauseIcon from "../../assets/pause_icon.png"
import ResetIcon from "../../assets/reset_icon.png"
import SendIcon from "../../assets/send_icon.png"

const RecordModal = ({ closeRecordModal, sendAudioFile }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [media, setMedia] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [recordedTime, setRecordedTime] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        let intervalId;
        if (isRecording) {
            intervalId = setInterval(() => {
                setRecordedTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isRecording]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const onRecordAudio = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setMedia(mediaRecorder);

            mediaRecorder.ondataavailable = (e) => {
                setAudioUrl(URL.createObjectURL(e.data));
            };

            mediaRecorder.onstop = () => {
                stream.getAudioTracks().forEach((track) => track.stop());
                setIsRecorded(true);
                setIsRecording(false);
            };

            setIsRecording(true);
        });
    };

    const offRecordAudio = () => {
        if (media) {
            media.stop();
        }
    };

    const handleRecordButton = () => {
        if (isRecording) {
            offRecordAudio();
        } else {
            onRecordAudio();
        }
    };

    const handlePlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handlePlaybackEnded = () => {
        setIsPlaying(false);
    };

    const handleResetRecord = () => {
        setIsRecorded(false);
        setAudioUrl(null);
        setRecordedTime(0);
        setIsPlaying(false); // 재생 상태 초기화
    };

    const handleSendAudio = useCallback(() => {
        if (audioUrl) {
            fetch(audioUrl)
                .then((res) => res.blob())
                .then((blob) => {
                    const audioFile = new File([blob], "audio_message.wav", {
                        type: "audio/wav",
                        lastModified: new Date(),
                    });
                    sendAudioFile(audioFile);
                    closeRecordModal();
                });
        }
    }, [audioUrl, closeRecordModal, sendAudioFile]);

    return (
        <div className="Back1" onClick={closeRecordModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>음성 메시지</h2>
                <div className="audio-display">
                    {isRecorded ? (
                        <>
                            <img
                                src={isPlaying ? PauseIcon : PlayIcon}
                                className="play-button"
                                onClick={handlePlayback}
                                alt="Play/Pause"
                            />
                            <span>{formatTime(recordedTime)}</span>
                        </>
                    ) : (
                        <span>{isRecording ? "녹음 중..." : "00:00"}</span>
                    )}
                </div>
                <div className="buttons">
                    <button className="cancel" onClick={closeRecordModal}>취소</button>
                    <img
                        src={isRecording ? StopIcon : isRecorded ? ResetIcon : RecordIcon}
                        className={`record ${isRecording ? 'active' : ''}`}
                        onClick={isRecorded ? handleResetRecord : handleRecordButton}
                        alt="녹음"
                    />
                    <img src={SendIcon} className="send" onClick={handleSendAudio} alt="전송" disabled={!isRecorded} />
                </div>
                {audioUrl && (
                    <audio
                        ref={audioRef}
                        src={audioUrl}
                        onEnded={handlePlaybackEnded}
                        style={{ display: "none" }}
                        controls
                    />
                )}
            </div>
        </div>
    );
};

export default RecordModal;
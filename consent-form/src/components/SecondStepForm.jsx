import React, {useCallback, useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faPlay, faRedo } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";
import {setVoice} from "../Utils/SpeechAPI.js";


const SecondStepForm = ({language, onSave}) => {
    const { t, i18n } = useTranslation();
    const [isRecording, setIsRecording] = useState(false);
    const [answer, setAnswer] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorderRef = useRef(null);
    const recognitionRef = useRef(null);

    //Record functions
    const handleSpeechRecognition = () => {
        if(speechSynthesis) speechSynthesis.cancel();
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.lang = language;
        recognitionRef.current.onresult = event => {
            const text = event.results[0][0].transcript;
            ['yes', 'no', 'oui', 'non'].includes(text) && setAnswer(text);
        };
        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };
        recognitionRef.current.start();
    }

    const handleMediaRecorder = () => {
        navigator
            .mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then(function (stream) {
                mediaRecorderRef.current = new MediaRecorder(stream);
                const chunks = [];
                mediaRecorderRef.current.addEventListener("dataavailable", event => {
                    chunks.push(event.data);
                });
                mediaRecorderRef.current.addEventListener("stop", () => {
                    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                    const url = URL.createObjectURL(blob);
                    setAudioURL(url);
                });
                mediaRecorderRef.current.start();
            })
    }

    const startRecording = useCallback( () => {
        handleSpeechRecognition();
        handleMediaRecorder();
    },[answer, isRecording]);

    const stopRecording = () => {
        clearTimeout(timeoutId);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    }

    useEffect(() => {
        //Check if browser support Web Speech API
        if (!window.speechSynthesis) {
            console.warn('Speech synthesis not supported in this browser');
            return;
        }

        //for simplify, I change language within this component only
        i18n.changeLanguage(language);

        //Speak out paragraph
        const utterance = setVoice(language, t('ConsentForm.Text'))
        speechSynthesis.speak(utterance);

        //Clear speech when unload
        window.onbeforeunload = (e) => speechSynthesis.cancel();
        return () => {
            //Clear speech when unmount component
            speechSynthesis.cancel();
        }
    }, []);


    useEffect(() => {
        if (isRecording) {
            setTimeoutId(setTimeout(() => {
                recognitionRef.current.stop();
                setIsRecording(false);
            }, 3000));
            startRecording();
        } else {
           stopRecording()
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isRecording]);



    const handleRecordButtonClick = () => {
       setIsRecording(!isRecording);
    };


    return (
        <div className="flex flex-col items-center">
            <p className="text-lg text-gray-700 my-6 whitespace-pre-line">
                {t('ConsentForm.Text')}
            </p>
            {!answer && <button
                onClick={handleRecordButtonClick}
                className={`btn circle ${
                    isRecording ? 'red' : 'green'
                }`}
            >
                <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone}/>
            </button>}
            {answer && (
                <>
                    <div className='flex flex-col items-center'>

                        {audioURL && (
                            <div className="mb-2">
                                <audio controls src={audioURL} />
                            </div>
                        )}

                        <p className="text-gray-700 ml-6">Your answer: "{answer}"</p>
                    </div>

                    <div className="mt-10 flex w-full justify-end">
                        <button
                        onClick={() => setAnswer('')}
                        className="btn default mr-2"
                        >
                            <FontAwesomeIcon icon={faRedo} /> Retry
                        </button>
                        <button
                            onClick={() => onSave(answer, audioURL)}
                            className="btn primary"
                        >
                            Save
                        </button>
                    </div>
                </>
            )}


        </div>
    );
};

export default SecondStepForm;
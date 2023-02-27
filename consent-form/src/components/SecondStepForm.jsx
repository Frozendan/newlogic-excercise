import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faPlay, faRedo } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";
import {setVoice} from "../Utils/SpeechAPI.js";


const SecondStepForm = ({language, onSave}) => {
    const { t, i18n } = useTranslation();
    const [isRecording, setIsRecording] = useState(false);
    const [answer, setAnswer] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    let recognition = null;

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
                recognition.stop();
                setIsRecording(false);
            }, 3000));
            startRecording();
        } else {
            clearTimeout(timeoutId);
            if (recognition) {
                recognition.stop();
            }
        }

        return () => {
            clearTimeout(timeoutId);
            if (recognition) {
                recognition.stop();
            }
        };
    }, [isRecording]);

    //Record functions
    const startRecording = () => {
        speechSynthesis.cancel();
        recognition = new window.webkitSpeechRecognition();
        recognition.onstart = () => {
            console.log('Recording started');
        };
        recognition.onresult = event => {
            const text = event.results[0][0].transcript;
            setAnswer(text);
        };
        recognition.onend = () => {
            console.log('Recording ended');
            setIsRecording(false);
        };
        recognition.start();
        console.log('Recording...');
    };

    const handleRecordButtonClick = () => {
       setIsRecording(!isRecording);
    };

    const playBack = () => {
        speechSynthesis.cancel();
        const utterance = setVoice(language, answer);
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
            speechSynthesis.cancel();
            setIsPlaying(false);
        };
        setIsPlaying(true);
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
                    <div className='flex justify-center items-baseline'>

                        { isPlaying ? (
                            <button
                                onClick={stopPlaying}
                                className="btn circle default"
                            >
                                <FontAwesomeIcon icon={faStop} />
                            </button>
                           ) : (
                            <button
                                onClick={playBack}
                                className="btn circle default"
                            >
                                <FontAwesomeIcon icon={faPlay} />
                            </button>
                            )
                        }

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
                            onClick={() => onSave(answer)}
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
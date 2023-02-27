import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";

const setVoice = (language, text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    switch (language) {
        case language.value === 'en':
            utterance.voice = voices[0];
            break;
        case language.value === 'fr':
            utterance.voice = voices[9];
            break;
        default:
            utterance.voice = voices[0];
    }
    return utterance;
}

const SecondStepForm = ({language}) => {
    const { t, i18n } = useTranslation();
    const [isRecording, setIsRecording] = useState(false);
    const [recordedText, setRecordedText] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);


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
        let recognition = null;

        const startRecording = () => {
            speechSynthesis.cancel();
            recognition = new window.webkitSpeechRecognition();
            recognition.onstart = () => {
                console.log('Recording started');
            };
            recognition.onresult = event => {
                const text = event.results[0][0].transcript;
                setRecordedText(text);
            };
            recognition.onend = () => {
                console.log('Recording ended');
                setIsRecording(false);
            };
            recognition.start();
            console.log('Recording...');
        };

        if (isRecording) {
            setTimeoutId(setTimeout(() => {
                recognition.stop();
                console.log('Recording stopped');
                setIsRecording(false);
            }, 3000));
            startRecording();
        } else {
            clearTimeout(timeoutId);
            if (recognition) {
                recognition.stop();
                console.log('Recording stopped');
            }
        }

        return () => {
            clearTimeout(timeoutId);
            if (recognition) {
                recognition.stop();
                console.log('Recording stopped');
            }
        };
    }, [isRecording]);

    const handleRecordButtonClick = () => {
       setIsRecording(!isRecording);
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-xl text-gray-700 my-6 whitespace-pre-line">
                {t('ConsentForm.Text')}
            </p>
            <button
                onClick={handleRecordButtonClick}
                className={`flex items-center justify-center bg-${
                    isRecording ? 'red' : 'green'
                }-500 hover:bg-${isRecording ? 'red' : 'green'}-700 text-white font-bold py-2 px-4 rounded-full shadow-md`}
            >
                <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
            </button>
            {recordedText && (
                <p className="text-gray-700 mt-6">{t('RecordedText')}: {recordedText}</p>
            )}
        </div>
    );
};

export default SecondStepForm;
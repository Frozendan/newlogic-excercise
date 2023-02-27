import { useState, useContext } from 'react';
import {AppContext} from "../context/AppContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlay, faStop, faXmark} from "@fortawesome/free-solid-svg-icons";
import {setVoice} from "../Utils/SpeechAPI.js";


function Consents() {
    const {state} = useContext(AppContext);
    const [isPlaying, setIsPlaying] = useState(false)
    const playBack = (language, answer) => {
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
        <div className="max-w-xl mx-auto my-4">
                <div className="px-6 py-4 ">
                    <h1 className="text-3xl font-bold text-center mb-10 mt-4">All Consents</h1>

                    {state.consentsList.map(consent => {
                        return <div className="px-6 py-4 mb-3 h-[80px] bg-gray-50 rounded-lg shadow-md overflow-hidden card flex justify-between" key={consent.id}>
                            <div>
                                <label className="block text-lg font-medium capitalize">{consent.name}</label>
                                <label className="block text-sm capitalize">Language: {consent.language.name }</label>
                            </div>
                            <div className="flex items-baseline">
                                <span className="block mr-3 text-gray-500"><FontAwesomeIcon size="lg" icon={consent.answer === "yes" ? faCheck : faXmark} /></span>
                                <button
                                    onClick={() => playBack(consent.language, consent.answer)}
                                    className="btn circle default"
                                >
                                    <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
                                </button>
                            </div>
                        </div>
                    })}
                </div>
        </div>
    );
}

export default Consents;
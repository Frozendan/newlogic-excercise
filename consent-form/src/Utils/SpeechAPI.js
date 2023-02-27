export const setVoice = (language, text) => {
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
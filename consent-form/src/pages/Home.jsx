import { useState, useContext } from 'react';
import FirstStepForm from "../components/FirstStepForm.jsx";
import SecondStepForm from "../components/SecondStepForm.jsx";
import {AppContext} from "../context/AppContext.jsx";
import FinalStep from "../components/FinalStep.jsx";
import {languages} from "../data/formConst.js";


function Home() {
   const {initData, addAnswer} = useContext(AppContext);
    const [language, setLanguagge] = useState('en');
   const [step, setStep] = useState(1);

   const handleSetFirstStep = (name, language) => {
       const selectedLang = languages.find(lang => lang.value === language);
       initData({name, selectedLang});
       setLanguagge(language);
       setStep((prevStep) => prevStep + 1);
   }

    const handleSave = (answer, audioUrl) => {
        addAnswer(answer, audioUrl)
        setStep((prevStep) => prevStep + 1);
    }

   return (
       <div className="max-w-xl mx-auto my-4">
           <div className="bg-white rounded-lg shadow-md overflow-hidden card">
               <div className="px-6 py-4 border-b">
                 <h1 className="text-3xl font-bold text-center mb-2 mt-4">Consent Form</h1>
                 {step === 1 && <FirstStepForm  onSetFirstStep={handleSetFirstStep} />}
                 {step === 2 && <SecondStepForm language={language} onSave={handleSave}/>}
                 {step === 3 && <FinalStep />}
              </div>
           </div>
       </div>
   );
}

export default Home;
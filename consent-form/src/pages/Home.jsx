import { useState } from 'react';
import FirstStepForm from "../components/FirstStepForm.jsx";
import SecondStepForm from "../components/SecondStepForm.jsx";

function Home() {
   const [step, setStep] = useState(1);
   const [data, setData] = useState({
           name: '',
           language: '',
           answer: '',
           voice: ''
   });

   const handleSetFirstStep = (name, language) => {
       setData({...data, name, language})
       setStep((prevStep) => prevStep + 1);
   }


   return (
       <div className="max-w-xl mx-auto my-4">
           <div className="bg-white rounded-lg shadow-md overflow-hidden card">
               <div className="px-6 py-4 bg-gray-100 border-b">
                 <h1 className="text-3xl font-bold text-center mb-2 mt-4">Consent Form</h1>
                 {step === 1 && <FirstStepForm  onSetFirstStep={handleSetFirstStep} />}
                 {step === 2 && <SecondStepForm language={data.language} />}
              </div>
           </div>
       </div>
   );
}

export default Home;
import React, { useContext, useState } from 'react';
import {languages} from "../data/formConst.js";



function FirstStepForm({ onSetFirstStep }) {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState(languages[0].value);


    const handleSubmit = (event) => {
        event.preventDefault();
        onSetFirstStep(name, language);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <form >
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        required
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                        value={name}
                        placeholder="Name"
                        onChange={handleNameChange}
                    />
                </div>
            </div>
            <div className="mt-4">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                </label>
                <div className="mt-1">
                    <select
                        id="language"
                        name="language"
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        {languages && languages.map(lang => <option key={lang.value} value={lang.value}>{lang.name}</option>) }
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={handleSubmit} type="button" className="btn primary">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default FirstStepForm;
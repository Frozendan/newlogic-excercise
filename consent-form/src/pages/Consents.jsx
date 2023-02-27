import { useContext } from 'react';
import {AppContext} from "../context/AppContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";


function Consents() {
    const {state} = useContext(AppContext);

    return (
        <div className="max-w-[800px] mx-auto my-4">
                <div className="px-6 py-4 ">
                    <h1 className="text-3xl font-bold text-center mb-10 mt-4">All Consents</h1>
                    {state.consentsList.length ? state.consentsList.map(consent => {
                        return <div className="px-6 py-4 mb-3 h-[80px] bg-gray-50 rounded-lg shadow-md overflow-hidden card flex justify-between" key={consent.id}>
                            <div>
                                <label className="block text-lg font-medium capitalize">{consent.name}</label>
                                <label className="block text-sm capitalize">Language: {consent.language.name }</label>
                            </div>
                            <div className="flex items-center">
                                <span className="block mr-3 text-gray-500"><FontAwesomeIcon size="lg" icon={(consent.answer === "yes" || consent.answer === "oui") ? faCheck : faXmark} /></span>
                                <audio controls src={consent.audioUrl} />
                            </div>
                        </div>
                    }): <p className="font-bold text-center text-gray-400">No data</p>}
                </div>
        </div>
    );
}

export default Consents;
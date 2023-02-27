import React from 'react';
import {Link} from "react-router-dom";
import {faFile, faFileLines, faPager, faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FinalStep = () => {
    return (
            <div className="flex flex-col items-center">
                <span className="flex justify-center items-center rounded-full bg-gray-500 mt-5 w-20 h-20 text-white"><FontAwesomeIcon size="xl" icon={faFileLines} /></span>
                <p className="text-md text-gray-700 my-6 whitespace-pre-line">
                   Thank you, your consent has been successfully saved!
                </p>
                <Link to="/consents" className="text-md font-medium underline" >View All Consents</Link>
            </div>
    );
};

export default FinalStep;

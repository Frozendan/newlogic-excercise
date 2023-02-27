import {createContext, useEffect, useReducer, useState} from "react";
import { v4 as uuid } from 'uuid';

const initialState = {
    consentsList: [],
    newConsent: {
        id: '',
        name: '',
        language: '',
        answer: ''
    }
};
const reducer = (state, action) => {
    switch (action.type) {
        case actions.INIT_CONSENT:
            console.log(action.payload.language)
            return {
                consentsList: [...state.consentsList],
                newConsent: {...state.newConsent,
                    id:  uuid().slice(0,8),
                    name: action.payload.name,
                    language: action.payload.language,
                }
            }
        case actions.ADD_ANSWER:
            const updatedConsent = {...state.newConsent,
                answer: action.payload.answer,
            }
            return {
                consentsList: [...state.consentsList,
                    updatedConsent
                ],
                newConsent: {...initialState.newConsent}
            }
        default:
            return state;
    }
};

const actions = {
    GET_FROM_LOCAL_STORAGE: "GET_FROM_LOCAL_STORAGE",
    INIT_CONSENT: "INIT_CONSENT",
    ADD_ANSWER: "ADD_ANSWER"
};
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    // State for the data and the next ID to use
    const [state, dispatch] = useReducer(reducer, initialState);

    // Define the values to provide through the context
    const values = {
        state,
        initData : ({name, selectedLang}) => {
            dispatch({type: actions.INIT_CONSENT, payload: {name, language: selectedLang}})
        },
        addAnswer: (answer) => {
            dispatch({type: actions.ADD_ANSWER, payload: {answer}})
        }
    };

    // Return the context provider with the given children and values
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
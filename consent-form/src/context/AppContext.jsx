import {createContext, useEffect, useState} from "react";
import { v4 as uuid } from 'uuid';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    // State for the data and the next ID to use
    const [data, setData] = useState([]);

    // Load data from localStorage on initialization
    useEffect(() => {
        // Get the stored data from localStorage
        const storedData = localStorage.getItem('exercise-data');

        // If there is stored data, parse it and use it to initialize the state
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.length > 0) {
                setData(parsedData);
            }
        }
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('exercise-data', JSON.stringify(data));
    }, [data]);

    // Add a new data item with the given properties
    const addData = (id, name, language, answer, voice) => {
        //I use uuid library to simulate ID generation in BE
        const newId = uuid().slice(0,8);

        // Create the new data item and add it to the state
        const newData = {
            id,
            name,
            language,
            answer,
            voice
        };
        setData([...data, newData]);
    };

    // Define the values to provide through the context
    const values = {
        data,
        addData
    };

    // Return the context provider with the given children and values
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
// ApiContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context
const ApiContext = createContext();

// Custom Hook to use API Context
export function useApi() {
    return useContext(ApiContext);
}

// Provider component to wrap the app
export function ApiProvider({ children }) {
    const [apiUrl] = useState('https://amused-sweatshirt-moth.cyclic.app/api');

    return (
        <ApiContext.Provider value={{ apiUrl }}>
            {children}
        </ApiContext.Provider>
    );
}

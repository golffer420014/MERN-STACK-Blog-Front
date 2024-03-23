// App.js
import React from 'react';
import { ApiProvider } from './ApiContext';
import TestApi from './TestApi';

function App() {
    return (
        <ApiProvider>
            <TestApi />
        </ApiProvider>
    );
}

export default App;

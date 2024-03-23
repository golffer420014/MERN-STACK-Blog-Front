// TestApi.js
import React from 'react';
import { useApi } from './ApiContext';
function TestApi() {
    const { apiUrl } = useApi();
    console.log(apiUrl)

    return (
        <div>
            <p>API URL: {apiUrl}</p>
            <h1>dawdawdwadwadwadwa</h1>
            {/* Your component logic here */}
        </div>
    );
}

export default TestApi;

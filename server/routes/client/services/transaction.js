// client/services/transactionService.js

import axios from 'axios';

export const createTransaction = (amount, type, category,date,userId) => {
    // Retrieve the token from localStorage
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWRhNWQ1OTE3N2IxMzhkM2VkNDg5NiIsImlhdCI6MTczMDA1ODU3MywiZXhwIjoxNzMwMDYyMTczfQ.doDciaJFS3MOjZXrEldlTTAhOQuQfUNI8mfIy4HVIag";

    // Send POST request with token in Authorization header
    return axios.post('http://localhost:5000/api/transactions', {
        amount,
        type,
        category,
        userId,
        date
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

export const getTransactions = () => {
    // Retrieve the token from localStorage
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWRhNWQ1OTE3N2IxMzhkM2VkNDg5NiIsImlhdCI6MTczMDA1ODU3MywiZXhwIjoxNzMwMDYyMTczfQ.doDciaJFS3MOjZXrEldlTTAhOQuQfUNI8mfIy4HVIag";

    // Send GET request with token in Authorization header
    return axios.get('http://localhost:5000/api/transactions', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
};

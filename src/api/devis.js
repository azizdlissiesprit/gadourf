
import axios from 'axios';
export const incrementDevisByYear = async (year) => {
    const response = await fetch('http://localhost:3001/increment-devis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year }),
    });

    if (!response.ok) {
        throw new Error('Failed to increment deviscompteur');
    }

    return response.json();
};
export const getDevisByYear = async (year) => {
    try {
        console.log("deviscompteur passed!")
        const response = await fetch(`http://localhost:3001/api/get-devis-by-year?year=${encodeURIComponent(year)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch document');
        }

        const document = await response.json();
        console.log("deviscompteur:", document.deviscompteur)
        return document;
    } catch (error) {
        console.error('Error fetching document:', error.message);
        throw error; // Re-throw the error to handle it in the caller
    }
};
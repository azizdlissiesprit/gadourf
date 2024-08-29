import axios from 'axios';

export async function GetVente() {
    try {
        const response = await axios.get('http://localhost:3001/api/getvente');
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}


export const addVente = async (venteItems, nomclient, date) => {
    const response = await fetch('http://localhost:3001/api/addvente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: venteItems,
            nomclient: nomclient,
            date: date,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to add vente item xxd');
    }
    
    else
    {console.log("this passed checkpoint")}
    
    return response.json();
};

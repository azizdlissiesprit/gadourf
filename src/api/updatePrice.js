import axios from 'axios';

export async function updatePrice(title, newPrice) {
    try {
        const response = await axios.put('http://localhost:3001/update-price', {
            title: title,
            newPrice: newPrice
        });
        return response.data;
    } catch (error) {
        console.error('Error updating price:', error);
        throw error;
    }
}

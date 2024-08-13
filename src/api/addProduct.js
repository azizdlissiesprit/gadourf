import axios from 'axios';

export async function addProduct(title, price) {
    try {
        const response = await axios.post('http://localhost:3001/add-product', {
            title: title,
            price: price
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

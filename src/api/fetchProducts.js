import axios from 'axios';

export async function fetchProduct() {
    try {
        const response = await axios.get('http://localhost:3001/fetch-products');
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

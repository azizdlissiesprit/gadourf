import axios from 'axios';

export async function addUser(user) {
    try {
        
        const response = await axios.post('http://localhost:3001/add-user', user);
        
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}
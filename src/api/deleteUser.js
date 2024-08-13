import axios from 'axios';

export const deleteUserByEmail = async (email) => {
  try {
    const response = await axios.delete(`http://localhost:3001/delete-user/${email}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.response.data);
  }
};

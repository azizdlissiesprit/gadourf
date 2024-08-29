import axios from 'axios';

export const addStock = async (stockItem) => {
  const response = await fetch('http://localhost:3001/api/addstock', { // Adjust the URL based on your server setup
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stockItem),
  });

  if (!response.ok) {
    throw new Error('Failed to add stock item');
  }

  return response.json();
};

export const getProductById = async (idproduit) => {
  try {
    const response = await axios.get('http://localhost:3001/api/getstock', { params: { idproduit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
  };
  
export const getProductByName = async (nomproduit) => {
  try {
    const response = await axios.get('http://localhost:3001/api/getstock', { params: { nom: nomproduit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by name:', error);
    throw error;
  }
  };
    
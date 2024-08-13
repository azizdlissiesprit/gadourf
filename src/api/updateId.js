import axios from 'axios';
export const updateStockIdsByName = async (name, newId) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock`, {
            params: { name }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;
        console.log(newId);
        // Step 2: Update the id for all documents that match the given name
        await Promise.all(stockItems.map(async (item) => {
            try {
                const updateResponse = await axios.put(`http://localhost:3001/api/stock/${item._id}`, {
                    idproduit: newId
                });
                if (updateResponse.status !== 200) {
                    throw new Error(`Failed to update stock item with id ${item._id}`);
                }
            } catch (error) {
                console.error(`Error updating stock item with id ${item._id}:`, error);
            }
        }));

        console.log('Successfully updated stock items');
    } catch (error) {
        console.error('Error updating stock items by name:', error);
    }
};
export const updateStockNamesById = async (id, newName) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock`, {
            params: { id }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;

        // Step 2: Update the id for all documents that match the given name
        await Promise.all(stockItems.map(async (item) => {
            try {
                const updateResponse = await axios.put(`http://localhost:3001/api/stock/${item._id}`, {
                    nom: newName
                });
                if (updateResponse.status !== 200) {
                    throw new Error(`Failed to update stock item with id ${item._id}`);
                }
            } catch (error) {
                console.error(`Error updating stock item with id ${item._id}:`, error);
            }
        }));

        console.log('Successfully updated stock items');
    } catch (error) {
        console.error('Error updating stock items by name:', error);
    }
};

export const updatePrixById = async (id, newPrix) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock`, {
            params: { id }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;

        // Step 2: Update the id for all documents that match the given name
        await Promise.all(stockItems.map(async (item) => {
            try {
                const updateResponse = await axios.put(`http://localhost:3001/api/stock/${item._id}`, {
                    prixunit: newPrix
                });
                if (updateResponse.status !== 200) {
                    throw new Error(`Failed to update stock item with id ${item._id}`);
                }
            } catch (error) {
                console.error(`Error updating stock item with id ${item._id}:`, error);
            }
        }));

        console.log('Successfully updated stock items');
    } catch (error) {
        console.error('Error updating stock items by name:', error);
    }
};


export const updateNbById = async (id, newNb) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock`, {
            params: { id }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;

        // Step 2: Update the id for all documents that match the given name
        await Promise.all(stockItems.map(async (item) => {
            try {
                const updateResponse = await axios.put(`http://localhost:3001/api/stock/${item._id}`, {
                    nbpieces: newNb
                });
                if (updateResponse.status !== 200) {
                    throw new Error(`Failed to update stock item with id ${item._id}`);
                }
            } catch (error) {
                console.error(`Error updating stock item with id ${item._id}:`, error);
            }
        }));

        console.log('Successfully updated stock items');
    } catch (error) {
        console.error('Error updating stock items by name:', error);
    }
};

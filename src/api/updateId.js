import axios from 'axios';
export const updateStockIds = async (idproduit, newId) => {
    try {
        // Step 1: Fetch all documents with the given nom
        const response = await axios.get('http://localhost:3001/api/stock/by-id', {
            params: { idproduit }
        });

        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;
        
        // Step 2: Update the id for all documents that match the given nom
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
        console.error('Error updating stock items by nom:', error);
    }
};
export const updateStockNamesById = async (idproduit, newName) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock/by-name`, {
            params: { idproduit }
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

export const updatePrixById = async (idproduit, newPrix) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock/by-name`, {
            params: { idproduit }
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


export const updateNbById = async (idproduit, newNb) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock/by-name`, {
            params: { idproduit }
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
export const updateepById = async (idproduit, newNb) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock/by-name`, {
            params: { idproduit }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;

        // Step 2: Update the id for all documents that match the given name
        await Promise.all(stockItems.map(async (item) => {
            try {
                const updateResponse = await axios.put(`http://localhost:3001/api/stock/${item._id}`, {
                    epaisseur: newNb
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
export const updatelongById = async (idproduit, newNb) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock/by-name`, {
            params: { idproduit }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;

        // Step 2: Update the id for all documents that match the given name
        await Promise.all(stockItems.map(async (item) => {
            try {
                const updateResponse = await axios.put(`http://localhost:3001/api/stock/${item._id}`, {
                    longeur: newNb
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
export const updatelarById = async (idproduit, newNb) => {
    try {
        // Step 1: Fetch all documents with the given name
        const response = await axios.get(`http://localhost:3001/api/stock/by-name`, {
            params: { idproduit }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch stock data');
        }

        const stockItems = response.data;

        // Step 2: Update the id for all documents that match the given name
        await Promise.all(stockItems.map(async (item) => {
            try {
                
                const updateResponse = await axios.put(`http://localhost:3001/api/stock/${item._id}`, {
                    largeur: newNb
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
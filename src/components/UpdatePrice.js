import React, { useState } from 'react';
import { updatePrice } from '../api/updatePrice';

function UpdatePrice() {
        const [title, setTitle] = useState('');
        const [newPrice, setNewPrice] = useState('');
        const [message, setMessage] = useState('');

    const handleUpdatePrice = async () => {
        try {
            const result = await updatePrice(title, newPrice);
            setMessage(result);
            console.log("here");
        } catch (error) {
            setMessage('Error updating pricee');
        }
    };

    return (
        <div>
            <h2>Update Product Price</h2>
            <input
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="New Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
            />
            <button onClick={handleUpdatePrice}>Update Price</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdatePrice;

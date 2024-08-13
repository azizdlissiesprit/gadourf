import React, { useState } from 'react';
import { addProduct } from '../api/addProduct';


function AddProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleAddProduct = async () => {
        try {
            const result = await addProduct(title, price);
            setMessage(result);
        } catch (error) {
            setMessage('Error adding product');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <input
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={handleAddProduct}>Add Product</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddProduct;
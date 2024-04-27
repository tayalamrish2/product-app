import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const { createProduct } = useProductContext();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({ productName: '', productPrice: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(newProduct).then(() => navigate('/home'));    
  };

  return (
    <div>
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="productName" value={newProduct.productName} onChange={handleInputChange} /><br />
        <label>Price: </label>
        <input type="number" name="productPrice" value={newProduct.productPrice} onChange={handleInputChange} /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
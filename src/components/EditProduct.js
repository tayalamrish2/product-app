import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProductContext();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find(p => p.id === id);
    setProduct(selectedProduct);
  }, [id, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    await updateProduct(product);
    navigate('/home');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="productName" value={product.productName} onChange={handleInputChange} /><br />
        <label>Price: </label>
        <input type="number" name="productPrice" value={product.productPrice} onChange={handleInputChange} /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProduct;
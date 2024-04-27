import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/edit/${product.id}`}>{product.productName} - {product.productPrice}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create">Create New Product</Link>
    </div>
  );
};

export default ProductList;
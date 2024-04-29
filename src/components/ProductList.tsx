import React from 'react';
import { useProductContext } from '../context/ProductContext.tsx';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div>
      <h1 className="heading">Product List</h1>
      <ul>
        {products?.map(product => (
          <li key={product.id}>
            <Link className="link" to={`/edit/${product.id}`}>{product.productName} - {product.productPrice}</Link>
          </li>
        ))}
      </ul>
      <Link className="link" to="/create">Create New Product</Link>
    </div>
  );
};

export default ProductList;
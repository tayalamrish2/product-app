import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ productService, children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts().then(setProducts);
  }, [productService]);

  const updateProduct = (data) => {
    productService.updateProduct(data).then(() => {
      setProducts(prevProducts => prevProducts.map(p => (p.id === data.id ? { ...p, ...data } : p)));
    });
  };

  const createProduct = (data) => {
    return productService.createProduct(data).then((product) => {
      setProducts(prevProducts => [...prevProducts, product]);
    });
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, createProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
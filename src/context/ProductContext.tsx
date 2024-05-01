import React, { createContext, useState, useEffect, useContext } from 'react';
import Product from '../model/product';
import ProductService from '../services/ProductService';
import { AxiosResponse } from 'axios';
type ProductContextProps = {
  productService: ProductService;
  children: any;
};

const ProductContext = createContext<ProductContextData>({});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider: React.FC<ProductContextProps> = ({ productService, children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getProducts();
    const subs = productService.getProductsObservable().subscribe(d => setProducts(d));   
    
    return () => subs.unsubscribe();
  }, []);

  const updateProduct = (data: Product) => {
    return productService.updateProduct(data);
  };

  const createProduct = (data: Product) => {
    return productService.createProduct(data);
  };

  return (
    <ProductContext.Provider value={{ products: products, updateProduct: updateProduct, createProduct: createProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export interface ProductContextData {
  products?: Product[], 
  updateProduct?: (data: Product) => Promise<AxiosResponse<any, any>>, 
  createProduct?: (data: Product) => Promise<AxiosResponse<any, any>>
}
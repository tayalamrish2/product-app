import axios, { AxiosInstance } from 'axios';
import Product from '../model/product'

class ProductService {    

    productList: Product[] = [];
    api: AxiosInstance;

    constructor() {
      this.api = axios.create({
        baseURL: 'http://localhost:8080/product'
      });
    }
  
    getProducts() {
      return this.api.get('/allProducts').then(res => res.data);
    }
  
    updateProduct(data: Product) {
      return this.api.patch('', data);
    }
  
    createProduct(data: Product) {
      return this.api.post('', data);
    }
  }
  
  export default ProductService;
import axios from 'axios';

class ProductService {
    constructor() {
      this.api = axios.create({
        baseURL: 'http://localhost:8080/product'
      });
    }
  
    getProducts() {
      return this.api.get('/allProducts').then(res => res.data);
    }

    getProduct(id) {
        return this.api.get('/', { id: id }).then(res => res.data);
      }
  
    updateProduct(id, data) {
      return this.api.patch(`/`, data).then(res => res.data);
    }
  
    createProduct(data) {
      return this.api.post('/', data).then(res => res.data);
    }
  }
  
  export default ProductService;
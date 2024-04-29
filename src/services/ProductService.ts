import axios, { AxiosInstance } from 'axios';
import Product from '../model/product'
import { Observable, Subject } from 'rxjs';
import WebSocketService from './websocket-service.ts';
import config from '../config/config.json';


class ProductService {    

    productList: Product[] = [];
    api: AxiosInstance;

    service: WebSocketService;

    productsSubject: Subject<Product[]> = new Subject();

    constructor() {
      this.api = axios.create({
        baseURL: config.restServiceBase
      });

      this.service = new WebSocketService(); 
      this.service.subscribeToMessages(config.productUpdateTopic, (data) => this.updateReceived(data));
    }

    updateReceived(data: any){
      const updatedProduct: Product = JSON.parse(data);   
      
      const updatedItems = this.productList.map(item =>
        item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item
      );

      if (!updatedItems.find(item => item.id === updatedProduct.id)) {
        updatedItems.push(updatedProduct);
      }

      this.productList = updatedItems;
      this.productsSubject.next(this.productList);
    }

    getProductsObservable(): Observable<Product[]> {
      return this.productsSubject.asObservable();
    }
  
    getProducts() {
      return this.api.get('/allProducts').then(res => {
        this.productList.splice(0);
        this.productList.push(...res.data);
        this.productsSubject.next(this.productList);
      });
    }
  
    updateProduct(data: Product) {
      // this.productList.push({id: '123', productName: 'Code', productPrice: 0.2}); 
      // this.productsSubject.next(this.productList);
      return this.api.patch('', data);
    }
  
    createProduct(data: Product) {
      return this.api.post('', data);
    }
  }
  
  export default ProductService;
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductService from './services/ProductService.ts';
import { ProductProvider } from './context/ProductContext.tsx';
import ProductList from './components/ProductList.tsx';
import EditProduct from './components/EditProduct.tsx';
import CreateProduct from './components/CreateProduct.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        <ProductProvider productService={new ProductService()}>
          <Router>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="*" element={<ProductList />} />  {/* Catch-all route */}
          </Routes>         
          </Router>
        </ProductProvider>
      </header>
    </div>
  );
}

export default App;

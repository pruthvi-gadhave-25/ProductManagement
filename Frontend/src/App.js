
import './App.css';
import ProductList from './component/ProductList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Product Managment</h1>
      </header>
   
     <section className='product-list'>
     <ProductList/>
     </section>
    </div>
  );
}

export default App;

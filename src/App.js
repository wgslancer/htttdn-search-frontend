import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Homepage } from './router/Homepage.components';
import { Product } from './router/Product.components';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;

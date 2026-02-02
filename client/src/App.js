import './App.css';
import {  Routes, Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Layout from './common/Layout';
import AddProduct from './ProductManage/AddProduct';
import UpdateProduct from './ProductManage/UpdateProduct';
import AllProducts from './ProductManage/AllProducts';
import DeleteProduct from './ProductManage/DeleteProduct';
import Logout from './common/Logout';
import HomePage from './HomePage';
import GetCart from './cart/GetCart';

function App() {
  return (
    <div className="App">   
        <Routes>
          <Route path='/' element={ <Layout/>}>
            <Route index element={ <HomePage/>} />
            <Route path='/Register' element={ <Register/>} />
            <Route path='/Login' element={ <Login/>} />
            <Route path='/AddProduct' element={ <AddProduct/>} />
            <Route path='/UpdateProduct/:id' element={ <UpdateProduct/>} />
            <Route path='/AllProducts' element={ <AllProducts/>} /> 
            <Route path='/DeleteProduct' element={ <DeleteProduct/>} />
            <Route path='/Logout' element={ <Logout/>} />
            <Route path='/GetCart' element={ <GetCart/>} />
          </Route>
        </Routes>   
    </div>
  );
}

export default App;

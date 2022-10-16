import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './bootstrap.min.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartDetailsPage from './pages/CartDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage'
import EditUserPage from './pages/EditUserPage'
import ProductListPage from './pages/ProductListPage'
import EditProductPage from './pages/EditProductPage'
import OrderListPage from './pages/OrderListPage'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/profile' element={<ProfilePage />}/>
            <Route path='/product/:id' element={<ProductPage/>} />
            <Route path='/cart' element={<CartDetailsPage />}/>
            <Route path='/cart/:id' element={<CartDetailsPage />}/>
            <Route path='/shipping' element={<ShippingPage />}/>
            <Route path='/placeorder' element={<PlaceOrderPage />}/>
            <Route path='/order/:id' element={<OrderPage />}/>
            <Route path='/payment' element={<PaymentPage />}/>
            <Route path='/admin/userlist' element={<UserListPage />}/>
            <Route path='/admin/orderlist' element={<OrderListPage />}/>
            <Route path='/admin/productlist' element={<ProductListPage />}/>
            <Route path='/admin/user/:id/edit' element={<EditUserPage />}/>
            <Route path='/admin/product/:id/edit' element={<EditProductPage />}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;

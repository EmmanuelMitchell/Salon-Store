
import './App.css';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
import React, { useContext } from 'react'
import { Store } from './Store';
import CartScreen from './screen/CartScreen';
import SignInScreen from './screen/SignInScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddress from './screen/ShippingAddress';
import SignUpScreen from './screen/SignUpScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import ProfileScreen from './screen/ProfileScreen';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart,userInfo} = state;

   const signoutHandler = ()=>{
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('PaymentMethod');
    window.location.href = '/signin';

   }



  return (
   <BrowserRouter>
   <div className='d-flex flex-column top-container'>
   <ToastContainer position="bottom-center" limit={1} />
      <Navbar bg="dark" variant="dark">
        <Container>
        <LinkContainer to="/">
                <Navbar.Brand>Salon Store</Navbar.Brand>
              </LinkContainer>

         <Nav className="me-auto">            
          <Link to="/cart"  className="nav-link">
                   Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        {/* {cart.cartItems.length} */}
                      </Badge>
                    )}
          </Link>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
               <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    
            </NavDropdown>
          ):(
            <Link className="nav-link" to="/signin">
            Sign In
          </Link> 
          )}
            </Nav>
        </Container>
      </Navbar>
     
      
     <main>
     <Container className="mt-4">
      <Routes>
        <Route path='/product/:slug' element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />  
        <Route path="/signin" element={<SignInScreen />} />  
        <Route path="/shipping" element={<ShippingAddress />} /> 
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} /> 
        <Route  path="/order/:id" element={<OrderScreen />} />  
        <Route path="/payment" element={<PaymentScreen />} />
   

        <Route path="/" element={<HomeScreen />} />
      </Routes>
      </Container>
     </main>
      <footer>
        <div className='text-center'>All right reserved</div>
      </footer>
   </div>
   </BrowserRouter>
  
  );
}

export default App;

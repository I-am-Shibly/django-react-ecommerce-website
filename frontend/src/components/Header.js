import React, { useState, useEffect } from 'react'
import { Container, Navbar, Nav, Button, Form, Row, Col, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Login } from '../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Logout } from '../redux/actions/userActions'
import SearchBox from './SearchBox'


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(Logout())
        navigate('/login')
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                   <LinkContainer to='/'>
                        <Navbar.Brand className="px-0">MyShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="mr-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link className="px-4">{cartItems.length === 0 ? (<i className="fas fa-cart-shopping"></i>) : (<i className="fas fa-shopping-cart"><span className='badge badge-warning' id='lblCartCount'> {cartItems.length} </span></i>)} Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={<span><i class="fa-solid fa-user"></i> {userInfo.name}</span>} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item><span style={{ color: 'green' }}>Profile <i className="fa-solid fa-user"></i></span></NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}><span style={{ color: 'red' }}>Logout <i className="fa-solid fa-right-from-bracket"></i></span></NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link className="px-4"><i className="fas fa-user"></i> Login</Nav.Link>
                                    </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title={<span style={{ color: 'greenyellow'}}><i className="fa-solid fa-user-check"></i> ADMIN</span>} id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item><i className="fa-solid fa-user-group"></i> Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item><i className="fa-brands fa-product-hunt"></i> Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item><i className="fa-sharp fa-solid fa-cart-flatbed-suitcase"></i> Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>
                        <div className="px-5">
                            <SearchBox />
                        </div>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
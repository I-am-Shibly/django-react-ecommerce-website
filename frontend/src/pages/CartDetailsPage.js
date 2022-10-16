import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message';
import '../index.css'

function CartDetailsPage() {
    const { id } = useParams()
    const [searchParams] = useSearchParams();
    const qty = Number(searchParams.get('qty'))
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        if (!userInfo)
            navigate('/login')  
        else
            navigate('/shipping')
    }

    return (
        <Row>
            <h2>SHOPPING CART</h2>

            <Col md={8}>
                {cartItems.length === 0 ? (
                    <>
                        <Message variant='info'>
                            <strong>Your cart is empty!</strong>
                        </Message>
                        <Link to='/' className='btn btn-primary'>Go Back</Link>
                    </>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                            <strong>{item.name}</strong>
                                        </Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Select
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>

                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='default'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal Item: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                            <h4> Price: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='button'
                                className='w-100'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartDetailsPage
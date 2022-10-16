import { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteOrder, deliverOrder, getOrderDetails, payOrder } from '../redux/actions/orderActions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET, ORDER_LIST_RESET } from '../redux/constants/orderConstants'

function OrderPage() {

    const navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDelete = useSelector(state => state.orderDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete


    const addPaypalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AZBtV-Ng8VM08pMEnVtgPOvuSbWvR8pjy1TEptmhjmbNnlAtM5lAY5UsDFU5QnbboMlGZs2xqURJJUXsAZBtV-Ng8VM08pMEnVtgPOvuSbWvR8pjy1TEptmhjmbNnlAtM5lAY5UsDFU5QnbboMlGZs2xqURJJUXs"
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)

    }


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        if (successDelete) {
            navigate('/admin/orderlist')
        }

        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
           
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [order, id, dispatch, successPay, successDeliver, navigate, userInfo, successDelete])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            dispatch(deleteOrder(Number(id)))
        }
    }

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    return loading ? (
        <>
            <Loader />
            <Loader />
            <Loader />
        </>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a target="_blank" href={`mailto:${order.user.email}`} rel="noreferrer">{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address},  {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                {console.log(order.orderItems)}

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                                </ListGroup.Item>

                                {/* {loadingDelete && (
                                    <>
                                        <Loader />
                                        <Loader />
                                        <Loader />
                                    </>
                                )}
                                {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
                                
                                {userInfo.isAdmin ? (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='w-100 btn btn-danger'
                                            onClick={() => deleteHandler(id)}
                                        >
                                            Delete Order
                                        </Button>
                                        </ListGroup.Item>
                                ) : (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='w-100 btn btn-danger'
                                            onClick={() => deleteHandler(id)}
                                        >
                                            Cancel Order
                                        </Button>
                                    </ListGroup.Item>
                                ) }
                                
                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice} (with 5% VAT)</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>

                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />

                                </ListGroup.Item>
                            )}
                        </ListGroup>

                        {loadingDeliver && (
                            <>
                                <Loader />
                                <Loader />
                                <Loader />
                            </>
                        )}

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                            className='w-100 btn btn-primary'
                                    onClick={deliverHandler}
                                >
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPage
import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { OrderListAction } from '../redux/actions/orderActions'

function OrderListPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(OrderListAction())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])


    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <>
                    <Loader />
                    <Loader />
                    <Loader />
                </>) : error ? (
                    <Message variant='red'>{error}</Message>
                ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>Total</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <i className='fa-solid fa-xmark ps-3' style={{ color: 'red' }}></i>
                                )}</td>

                                <td>{order.isDelivered ? (
                                    order.deliveredAt
                                ) : (
                                        <i className='fa-solid fa-xmark ps-5' style={{ color: 'red' }}></i>
                                )}
                                </td>
                
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='primary' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListPage
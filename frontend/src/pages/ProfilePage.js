import { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants'
import { myOrderListAction } from '../redux/actions/orderActions'

function ProfilePage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const updateProfile = useSelector(state => state.updateProfile)
    const { success } = updateProfile

    const myOrderList = useSelector(state => state.myOrderList)
    const { loading: loadingOrders, error: errorOrders, orders } = myOrderList

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(myOrderListAction())
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, user, dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage("password don't match")
        } else {
            dispatch(updateUserProfile({
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{message}</Message>}
                    {loading &&
                        <>
                            <Loader />
                            <Loader />
                            <Loader />
                        </>
                    }
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>

                            <Form.Group controlId='email'>
                                <Form.Label className='mt-3'>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label className='mt-3'>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='passwordConfirm'>
                                <Form.Label className='mt-3'>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Form.Group>

                        <Button type='submit' className='my-3' variant='primary'>
                            Update
                        </Button>

                    </Form>

                </Col>

                <Col md={9}>
                    <h2>My Orders</h2>

                    {loadingOrders ?
                        (<>
                            <Loader />
                            <Loader />
                            <Loader />
                        </>) : errorOrders ?
                            (<Message variant='danger'>{errorOrders}</Message>) :
                            (<Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fa-solid fa-circle-xmark' style={{color: 'red'}}></i>
                                            )}</td>
                                            
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>)}
                </Col>
            </Row>
        </div>
    )
}

export default ProfilePage
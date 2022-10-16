import { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Login } from '../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search] = useSearchParams()
    const redirect = search.get('register') ? 'register' : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(Login(email, password))
    }

    return (
        <FormContainer>
            <h1> Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}

            {loading &&
                <>
                    <Loader />
                    <Loader />
                    <Loader />
                </>
            }
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label className='mt-3'>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Not have account?
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='ps-1'>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage
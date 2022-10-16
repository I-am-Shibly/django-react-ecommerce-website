import { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Register } from '../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


function RegisterPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search] = useSearchParams()
    const redirect = search.get('login') ? 'login' : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("password don't match")
        } else {
            dispatch(Register(name, email, password))
        }
    }

  return (
      <FormContainer>
          <h1>Registration</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}

          {loading &&
              <>
                  <Loader />
                  <Loader />
                  <Loader />
              </>
          }

          <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                  <Form.Label>Enter name</Form.Label>
                  <Form.Control
                      required
                      type='name'
                      placeholder='Enter Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  ></Form.Control>

                  <Form.Group controlId='email'>
                      <Form.Label className='mt-3'>Email Address</Form.Label>
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

                  <Form.Group controlId='passwordConfirm'>
                      <Form.Label className='mt-3'>Confirm Password</Form.Label>
                      <Form.Control
                          required
                          type='password'
                          placeholder='Confirm Password'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                      ></Form.Control>
                  </Form.Group>
              </Form.Group>

              <Button type='submit' className='mt-3' variant='primary'>
                  Register
              </Button>

          </Form>

          <Row className='py-3'>
              <Col>
                  Have an Account?
                  <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}
                      className='ps-1'>
                      Sign In 
                  </Link>
              </Col>
          </Row>
      </FormContainer>
  )
}

export default RegisterPage
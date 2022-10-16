import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'


function EditUserPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        }
        else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }

    }, [user, id, dispatch, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                <i className="fa-solid fa-arrow-left-long"> Go Back</i>
            </Link>

            <FormContainer>
                <h1>Edit User</h1>

                {loadingUpdate &&
                    <>
                        <Loader />
                        <Loader />
                        <Loader />
                    </>
                }

                {errorUpdate && <Message variant='red'>{errorUpdate}</Message>}


                {loading ?
                    <>
                        <Loader />
                        <Loader />
                        <Loader />
                    </> : error ?
                        <Message variant='danger'>{error}</Message> : (
                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='name'>
                                    <Form.Label>Enter name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label className='mt-3'>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check
                                        className='mt-3'
                                        type='checkbox'
                                        label='Is Admin'
                                        checked={isAdmin}
                                        onChange={(e) => setAdmin(e.target.checked)}
                                    ></Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='primary' className='my-3'>
                                    Update
                                </Button>

                            </Form>
                        )
                }
            </FormContainer>
        </div>
    )
}

export default EditUserPage
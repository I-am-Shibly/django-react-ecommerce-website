import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../redux/actions/userActions'

function UserListPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const usersList = useSelector(state => state.usersList)
  const { loading, users, error } = usersList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success } = userDelete


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, success, userInfo])


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <h1>Users</h1>
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN STATUS</th>
              <th>EDIT / DELETE</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? (
                  <i className='fa-solid fa-user-check ps-5' style={{ color: 'green' }}></i>
                ) : (
                  <i className='fa-solid fa-user-xmark ps-5' style={{ color: 'red' }}></i>
                )}</td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='primary' className='btn-sm'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </Button>
                  </LinkContainer>

                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                    <i className='fa-solid fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListPage
import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate';
import { listProducts, deleteProductAction, createProductAction } from '../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'

function ProductListPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const keyword = useLocation()

    const productList = useSelector(state => state.productList)
    const { loading, products, error, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword.search))
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProductAction(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProductAction())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col>
                    <Button className='float-end my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete &&
                <>
                    <Loader />
                    <Loader />
                    <Loader />
                </>
            }

            {errorDelete && <Message variant='red'>{errorDelete}</Message>}

            {loadingCreate &&
                <>
                    <Loader />
                    <Loader />
                    <Loader />
                </>
            }

            {errorCreate && <Message variant='red'>{errorDelete}</Message>}

            {loading ? (
                <>
                    <Loader />
                    <Loader />
                    <Loader />
                </>) : error ? (
                    <Message variant='red'>{error}</Message>
                ) : (
                <div>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>EDIT / DELETE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>


                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='primary' className='btn-sm'>
                                                <i className='fa-solid fa-pen-to-square'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <i className='fa-solid fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                            </Table>
                            <Paginate pages={pages} page={ page} isAdmin={true} />
                </div>
            )}
        </div>
    )
}

export default ProductListPage
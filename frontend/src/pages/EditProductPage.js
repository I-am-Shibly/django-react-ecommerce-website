import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import FormContainer from '../components/FormContainer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { IndividualProductDetails, updateProductAction } from '../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants'


function EditProductPage() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {

            if (!product.name || product._id !== Number(id)) {
                dispatch(IndividualProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }

    }, [product, id, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProductAction({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
    
    return (
        <div>
            <Link to='/admin/productlist'>
                <i className="fa-solid fa-arrow-left-long"> Go Back</i>
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>

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
                                        type='text'
                                        placeholder='Enter Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label className='mt-4'>Enter price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label className='mt-4'>Image</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter image'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    >
                                    </Form.Control>

                                    <input type="file" className="form-control form-control-sm mt-1" id="image-file" onChange={uploadFileHandler} custom></input>

                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label className='mt-4'>Enter Brand</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Brand'
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label className='mt-4'>Enter Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countInStock'>
                                    <Form.Label className='mt-4'>Enter Stock</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Stock'
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label className='mt-4'>Enter Description</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
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

export default EditProductPage
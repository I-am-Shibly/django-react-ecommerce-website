import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { IndividualProductDetails, createReviewAction } from '../redux/actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants'


function ProductPage() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const history = useNavigate()
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { loading: loadingReview, error: errorReview, success: successReview } = productReviewCreate

  const { id } = useParams()

  useEffect(() => {
    if (successReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(IndividualProductDetails(id))

  }, [dispatch, id, successReview])

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createReviewAction(
      id,
      {
        rating,
        comment
      }
    ))
  }


  return (
    <div>
      <Link to='/' className='btn btn-outline-primary my-3'>Go Back</Link>
      {loading ?
        <div>
          <Loader />
          <Loader />
          <Loader />
        </div>
        : error ? <Message variant='danger'>{error} </Message>
          :
          <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>

              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item >
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item >
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fcfc03'} />
                  </ListGroup.Item>

                  <ListGroup.Item >
                    Price: ${product.price}
                  </ListGroup.Item>

                  <ListGroup.Item >
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>


              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col xs='auto'>
                            <Form.Select
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className='w-100'
                        disabled={product.countInStock === 0}
                        type='button'>
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h4 className='mt-5'>Reviews</h4>
                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                <ListGroup variant='flush'>

                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color='#f8e825' />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4 className='mt-4'>Write a review</h4>

                    {loadingReview &&
                      <div>
                        <Loader />
                        <Loader />
                        <Loader />
                      </div>}
                    {successReview && <Message variant='success'>Review Added</Message>}
                    {errorReview && <Message variant='danger'>{errorReview}</Message>}
                    
                    {userInfo ?
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Select
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1-poor</option>
                            <option value="2">2-fair</option>
                            <option value="3">3-good</option>
                            <option value="4">4-very good</option>
                            <option value="5">5-excellent</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='comment'>
                          <Form.Label className='mt-3'>Review</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='5'
                            placeholder='please write a review...'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingReview}
                          type='submit'
                          variant='primary'
                          className='btn btn-md mt-3'
                        >
                          Submit
                        </Button>
                      </Form> :

                      <Message variant='info'>Please <Link to='/login'>Login</Link> to write a review</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
      }
    </div>
  )
}



export default ProductPage
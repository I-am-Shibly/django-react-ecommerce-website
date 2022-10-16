import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import Product from '../components/Product'
import { listProducts } from '../redux/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

function HomePage() {
  const dispatch = useDispatch()

  const keyword = useLocation()

  const productList = useSelector(state => state.productList)
  const { products, loading, error, pages, page } = productList

  useEffect(() => {
    if (keyword.search) {
      dispatch(listProducts(keyword.search))
    }
    else {
      dispatch(listProducts())
    }
  }, [dispatch, keyword])

  return (
    <div>
      {!keyword.search && <ProductCarousel />}
      <h1 className='mt-5'>Latest Products</h1>
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
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
            </Row>

            <div className='mt-3 pagination'>
              <Paginate page={page} pages={pages} />
            </div>
            </div>
      }
    </div>
  )
}

export default HomePage
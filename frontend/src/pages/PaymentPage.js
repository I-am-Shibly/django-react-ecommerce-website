import { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Progress from '../components/Progress'
import { savePaymentMethod } from '../redux/actions/cartActions'

function PaymentPage() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ paymentMethod, setPaymentMethod ] = useState('')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <Progress step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='Paypal'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >
                        </Form.Check>

                        <Form.Check
                            type='radio'
                            label='Bkash'
                            id='Bkash'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.id)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button className= 'mt-2' type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage
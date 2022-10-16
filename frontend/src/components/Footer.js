import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


function Footer() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-3 border-bottom mt-4'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/' className='me-4 text-reset' target="_blank">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://twitter.com/home' className='me-4 text-reset' target="_blank">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='https://www.google.com/' className='me-4 text-reset' target="_blank">
            <MDBIcon fab icon="google" />
          </a>
          <a href='https://www.instagram.com/' className='me-4 text-reset' target="_blank">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://www.linkedin.com/' className='me-4 text-reset' target="_blank">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='https://github.com/I-am-Shibly/django-react-ecommerce' className='me-4 text-reset' target="_blank">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-4'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-2'>
              <h6 className='text-uppercase fw-bold mb-2' style={{ color: 'white' }}>
                <MDBIcon icon="gem" className="me-3" style={{color:'white'}}/>
                About Us
              </h6>
              <p>
                We are building amazing products using modern technologies and keep supporting our customers.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-2'>
              <h6 className='text-uppercase fw-bold mb-2' style={{ color: 'white' }}>Our Services</h6>
              <p>
                  Django
              </p>
              <p>
                  Flask
              </p>
              <p>
                  React
              </p>
              <p>
                  Angular
              </p>
            </MDBCol>

            {/* <MDBCol md="3" lg="2" xl="2" className='mx-auto'>
              <h6 className='text-uppercase fw-bold mb-3' style={{ color: 'white' }}>Useful links</h6>
              <p>
                <a href='/' className='text-reset'>
                  Home Page
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol> */}

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Dhaka, Bangladesh
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                samiul.shibli@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +88 01797 330 796
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +88 01797 330 796
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        © 2022 Copyright: 
        <a className='text-reset fw-bold p-2' href='/'>
           MyShop
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer
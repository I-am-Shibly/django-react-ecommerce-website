import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <div className='pb-2 m-auto' style={{ display: 'table' }}>
      <Spinner animation='grow' variant='primary' />
      <Spinner animation='grow' variant='primary' />
      <Spinner animation='grow' variant='primary' />
      <Spinner animation='grow' variant='primary' />
    </div>
  )
}

export default Loader
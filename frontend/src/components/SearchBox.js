import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchBox() {
    const [keyWord, setKeyword] = useState('')

    let navigate = useNavigate();
    const location = useLocation()


    // navigate({
    //     pathname: "listing",
    //     search: `?${createSearchParams({
    //         foo: "bar"
    //     })}`
    // });

        // `/?search=?${keyWord}`

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyWord) {
            navigate({
                pathname: '/',
                search: `?keyword=${keyWord}&page=1`
            })
        } else {
            navigate(location)
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type="text"
                placeholder="Search"
                label='q'
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5" />
            
            <Button
                type='submit'
                variant='outline-success'
                >
                <i className="fa fa-search"></i>
            </Button>
        </Form>
    )
}

export default SearchBox
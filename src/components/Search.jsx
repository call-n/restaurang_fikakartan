import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Autocomplete } from '@react-google-maps/api'
import {useRef} from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = ({ onSubmit }) => {

    const searchRef = useRef()
    const [searchParams, setSeachParams] = useSearchParams()
    // Submit the search ref to caller
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!searchRef.current.value){
            return
        }

        setSeachParams({city:searchRef.current.value})
        onSubmit(searchRef.current.value)
    }
  return (
      <Form onSubmit={handleSubmit} className="d-flex">  
          <Form.Group>
              <Autocomplete>
                  <Form.Control
                        type="text"
                        placeholder="Type a address"
                        ref={searchRef}
                  />
              </Autocomplete>
          </Form.Group>
          <Button className='m-1' type="submit" variant="dark">Search!</Button>
      </Form>
  )
}

export default Search
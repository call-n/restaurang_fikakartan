import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Autocomplete } from '@react-google-maps/api'
import {useRef} from 'react'

const Search = ({ onSubmit }) => {

    const searchRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!searchRef.current.value){
            return
        }

        onSubmit(searchRef.current.value)
        console.log('Searcing for:', searchRef.current.value)
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
          <Button type="submit" variant="dark">Search!</Button>
      </Form>
  )
}

export default Search
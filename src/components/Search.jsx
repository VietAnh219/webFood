import { useState } from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [input, setInput] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/searched/' + input)
    }
    
  return (
    <FormStyle onSubmit={handleSubmit}>
        <div>
            <FaSearch></FaSearch>
            <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Your food your need..."
            />
        </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0rem 20rem;
    div {
        position: relative;
        width: 100%;
        color: white;
    }
    input{
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(100%, -50%)
    }
`

export default Search
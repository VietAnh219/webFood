import Pages from "./pages/Pages"
import Category from "./components/Category"
import { BrowserRouter, Link } from "react-router-dom"
import Search from "./components/Search"
import styled from 'styled-components'
import { GiKnifeFork } from 'react-icons/gi'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav>
                    <GiKnifeFork/>
                    <Logo to={"/"}>deliciouss</Logo>
                </Nav>
                <Search/>
                <Category/>
                <Pages/> 
            </BrowserRouter>
        </div>
    )
}

const Logo = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 400;
    font-family: 'Lobster Two', cursive;
    color: inherit;
`

const Nav = styled.div`
    padding: 4rem 0rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    svg {
        font-size: 2rem;
    }
`

export default App
import React from 'react'
import { useEffect, useState} from 'react'
import { Link,useParams } from 'react-router-dom'
import styled from 'styled-components'



function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([])
  let params = useParams();


  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
    const recipes = await data.json()

    setSearchedRecipes(recipes.results)

  }
  
  useEffect(() => {
    getSearched(params.search);
    console.log(params.search);

  },[params.search])


  return (
    <Grid>
      {searchedRecipes.map(item => (
        <Link to={"/recipe/" + item.id}>
          <Card key={item.id}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
          </Card>
        </Link>
      ))}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  a {
    text-decoration: none;
    color: inherit;
  }
`

const Card = styled.div`
  img {
      width: 100%;
      border-radius: 2rem;
  }
  a {
      text-decoration: none;
  }
  h4 {
      text-align: center;
      padding: 1rem;
  }
`

export default Searched
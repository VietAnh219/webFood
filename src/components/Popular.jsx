import { useEffect, useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";

function Popular() {

  const [populars, setPopular] = useState([])
  
  useEffect(() => {
    getPopular()
  },[])

  const getPopular = async() => {
    const check = localStorage.getItem('populars')

    if(check) {
      setPopular(JSON.parse(check))
    }else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
      const data = await api.json()
      
      localStorage.setItem('populars', JSON.stringify(data.recipes))
      setPopular(data.recipes)
    }

  }

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem'
        }}>
          {populars.map(popular => (
            <SplideSlide key={popular.id}>
              <Card>
                <Link to={'/recipe/' + popular.id}>
                  <p>{popular.title}</p>
                  <img src={popular.image} alt={popular.title} />
                  <Gradient/>
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    height: 40%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
  }
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`

export default Popular
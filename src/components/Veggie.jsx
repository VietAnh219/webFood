import { useEffect, useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css";

function Veggie() {
  const [veggies, setVeggie] = useState([])
  
  useEffect(() => {
    getVeggie()
  },[])

   const getVeggie = async() => {
    const check = localStorage.getItem('veggies')

    if(check) {
      setVeggie(JSON.parse(check))
    }else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
      const data = await api.json()
      
      localStorage.setItem('veggies', JSON.stringify(data.recipes))
      setVeggie(data.recipes)
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem'
        }}>
        {veggies.map(veggie => (
          <SplideSlide key={veggie.id}>
            <Card>
              <Link to={'/recipe/' + veggie.id}>
                <p>{veggie.title}</p>
                <img src={veggie.image} alt={veggie.title} />
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
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
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

export default Veggie
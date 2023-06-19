import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './rating.css'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';


const Rating = () => {
  const [beersList, setBeersList] = useState(false)

  const loadBeers = async () => {
    setBeersList(false)
    const response = await fetch(`http://localhost:3001/beers?approved=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (response.ok) {
        const data = await response.json();
        setBeersList(data)
    } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert("Error: " + (errorData.error || errorData.message))
    }
  }

  useEffect(() => {
    loadBeers()
  }, [])

  
  return (
    <div className='con'>
      	<div className='ratingBody'>
        <div className='cardBody'>

          {beersList ? beersList.map(beer => {
            return <Link to={"/beers/"+beer.beer_id} key={beer.beer_id}><Card style={{ width: '18rem', height:'25rem', margin: '0.25rem'}}>
              <Card.Img variant="top" height={250} style={{objectFit: "cover"}} src={beer.beer_image} />
              <Card.Body>
                <Card.Title>{beer.beer_name}</Card.Title>
              </Card.Body>
			  <Card.Footer>
                <Button variant="primary">Rate the Beer</Button>
			  </Card.Footer>
            </Card></Link>
          }) : "Loading beers..."}
        </div>


      </div>
    </div>
  );
}

export default Rating;
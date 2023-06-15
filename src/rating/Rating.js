import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import './rating.css'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';


const Rating = () => {
  const { loginInfo } = useContext(AppContext)
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
        <div className='carouselBody'>



          <Carousel variant="dark">
            {/*Item One*/}
            <Carousel.Item>
              <img
                className="d-block w-100 my-carousel-image"
                src="https://www.flaschenbote.de/media/image/4b/e3/1c/_dsf0207jpg-image-450x300_600x600.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/*Item Two*/}
            <Carousel.Item>
              <img
                className="d-block w-100 my-carousel-image"
                src="https://www.getraenkedienst.com/media/image/dc/33/1c/Meckatzer_Weiss-Gold_20_x_0_5l_1280x1280.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/*Item Three*/}
            <Carousel.Item>
              <img
                className="d-block w-100 my-carousel-image"
                src="https://getraenkelieferservice-schwerin.de/wp-content/uploads/2018/04/Wernesgr%C3%BCner-Pils-05L-Glas-im-20er-Kasten.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>



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

          {/* <Card style={{ width: '18rem', margin: '0.25rem'}}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1njt_Dp9inaJf7Te0ViGPCbjunnWWwXo6w&usqp=CAU" />
            <Card.Body>
              <Card.Title>Augustiner</Card.Title>
              <Card.Text>
                Ein besonders mildes, spritziges, lang gelagertes und vor allem erfrischendes Bier.
              </Card.Text>
              <Button variant="primary">Rate the Beer</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', margin: '0.25rem'}}>
            <Card.Img variant="top" src="https://www.getraenkedienst.com/media/image/4f/c5/31/Tegernseer_Hell_20_x_0_5l.jpg" />
            <Card.Body>
              <Card.Title>Tegernseer Hell</Card.Title>
              <Card.Text>
                Das typisch bayerische helle Vollbier. Gebraut nach dem bayerischen Reinheitsgebot.
              </Card.Text>
              <Button variant="primary">Rate the Beer</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem', margin: '0.25rem'}}>
            <Card.Img variant="top" src="https://www.getraenke-frieling.de/wp-content/uploads/2021/02/frueh-koelsch-24x033l.png" />
            <Card.Body>
              <Card.Title>Früh Kölsch</Card.Title>
              <Card.Text>
                Das beliebte Bier der Kölner ist mit seinem lecker süffigen Geschmack die kölsche Spezialität.
              </Card.Text>
              <Button variant="primary">Rate the Beer</Button>
            </Card.Body>
          </Card> */}
        </div>


      </div>
    </div>
  );
}

export default Rating;
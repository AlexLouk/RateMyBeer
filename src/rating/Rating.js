import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './rating.css'

export const rating = () => {
  return (
    <div>
      <div className='ratingBody'>
        <div className='cardBody'>
          {/*Card 1*/}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1njt_Dp9inaJf7Te0ViGPCbjunnWWwXo6w&usqp=CAU" />
            <Card.Body>
              <Card.Title>Augustiner</Card.Title>
              <Card.Text>
               Ein besonders mildes, spritziges, lang gelagertes und vor allem erfrischendes Bier.
              </Card.Text>
              <Button variant="primary">Rate the Beer</Button>
            </Card.Body>
          </Card>
        </div>
        <div className='cardBody'>
          {/*Card 2*/}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.getraenkedienst.com/media/image/4f/c5/31/Tegernseer_Hell_20_x_0_5l.jpg" />
            <Card.Body>
              <Card.Title>Tegernseer Hell</Card.Title>
              <Card.Text>
              Das typisch bayerische helle Vollbier. Gebraut nach dem bayerischen Reinheitsgebot.
              </Card.Text>
              <Button variant="primary">Rate the Beer</Button>
            </Card.Body>
          </Card>
        </div>
        <div className='cardBody'>
          {/*Card 3*/}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.getraenke-frieling.de/wp-content/uploads/2021/02/frueh-koelsch-24x033l.png" />
            <Card.Body>
              <Card.Title>Früh Kölsch</Card.Title>
              <Card.Text>
              Das beliebte Bier der Kölner ist mit seinem lecker süffigen Geschmack die kölsche Spezialität.
              </Card.Text>
              <Button variant="primary">Rate the Beer</Button>
            </Card.Body>
          </Card>
          
        </div>
      

     
      </div>
    </div>
  );
}

export default rating;
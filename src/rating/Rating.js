import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const rating = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="./beer/augustinerHell.jpg" />
            <Card.Body>
              <Card.Title>Augustiner Hell</Card.Title>
              <Card.Text>
              Brillant strohgelbes Lager mit seidigem weißem Schaumkragen zeigt sich ein Aroma, das trocken malzaromatisch, 
              frisch getreidig nach knusprigen Cornflakes und etwas Honig, mit frischen grasigen und floralen (Zitronenmelisse) 
              Akzenten von Hopfen in der Nase liegt.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="./beer/augustinerHell.jpg" />
            <Card.Body>
              <Card.Title>Augustiner Hell</Card.Title>
              <Card.Text>
              Brillant strohgelbes Lager mit seidigem weißem Schaumkragen zeigt sich ein Aroma, das trocken malzaromatisch, 
              frisch getreidig nach knusprigen Cornflakes und etwas Honig, mit frischen grasigen und floralen (Zitronenmelisse) 
              Akzenten von Hopfen in der Nase liegt.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="beer/augustinerHell.jpg" />
            <Card.Body>
              <Card.Title>Spaten Hell</Card.Title>
              <Card.Text>
              Brillant strohgelbes Lager mit seidigem weißem Schaumkragen zeigt sich ein Aroma, das trocken malzaromatisch, 
              frisch getreidig nach knusprigen Cornflakes und etwas Honig, mit frischen grasigen und floralen (Zitronenmelisse) 
              Akzenten von Hopfen in der Nase liegt.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default rating;
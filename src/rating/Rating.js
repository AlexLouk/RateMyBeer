import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './rating.css';

export const Rating = () => {
  const [beerRatings, setBeerRatings] = useState({});

  const beers = [
    {
      id: 1,
      name: 'Augustiner',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1njt_Dp9inaJf7Te0ViGPCbjunnWWwXo6w&usqp=CAU',
      description: 'Ein besonders mildes, spritziges, lang gelagertes und vor allem erfrischendes Bier.',
    },
    {
      id: 2,
      name: 'Tegernseer Hell',
      image: 'https://www.getraenkedienst.com/media/image/4f/c5/31/Tegernseer_Hell_20_x_0_5l.jpg',
      description: 'Das typisch bayerische helle Vollbier. Gebraut nach dem bayerischen Reinheitsgebot.',
    },
    {
      id: 3,
      name: 'Früh Kölsch',
      image: 'https://www.getraenke-frieling.de/wp-content/uploads/2021/02/frueh-koelsch-24x033l.png',
      description: 'Das beliebte Bier der Kölner ist mit seinem lecker süffigen Geschmack die kölsche Spezialität.',
    },
    // Weitere Biere hier hinzufügen...
  ];

  const handleRating = (beerId, rating) => {
    setBeerRatings((prevRatings) => ({
      ...prevRatings,
      [beerId]: rating,
    }));
    // Hier kannst du die Logik für die Verarbeitung der Bewertung implementieren
    console.log(`Bier ${beerId}: Bewertung ${rating} Sterne`);
  };

  const renderRatingStars = (beerId) => {
    const rating = beerRatings[beerId] || 0;

    return (
      <div className="ratingStars">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? 'active' : ''}`}
            onMouseEnter={() => handleRating(beerId, i + 1)}
            onMouseLeave={() => handleRating(beerId, 0)}
            onClick={() => handleRating(beerId, i + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  const renderBeerCards = beers.map((beer) => (
    <Card key={beer.id} style={{ width: '18rem', margin: '0.25rem' }}>
      <Card.Img variant="top" src={beer.image} />
      <Card.Body>
        <Card.Title>{beer.name}</Card.Title>
        <Card.Text>{beer.description}</Card.Text>
        {renderRatingStars(beer.id)}
      </Card.Body>
    </Card>
  ));

  return (
    <div className="con">
      <div className="ratingBody">
        <div className="cardBody">{renderBeerCards}</div>
      </div>
    </div>
  );
};

export default Rating;

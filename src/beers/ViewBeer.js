import { useParams } from 'react-router-dom';
import './Beers.css'
import Card from 'react-bootstrap/Card'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

const starCh = "★"

const Star = ({active, onClick}) => {
    return (<div onClick={onClick} style={{display: "inline"}}>
        <span className='rating-star' style={{color: active ? "yellow" : "grey"}}>{starCh}</span>
    </div>)
}

function ViewBeer() {
    const { beerId } = useParams()
    const { loginInfo } = useContext(AppContext)
    const [beer, setBeer] = useState(false)
    const [ratings, setRatings] = useState(false)
    var ratingsLoaded = false

    const loadRatings = async (force) => {
        if (ratingsLoaded) return
        ratingsLoaded = true
        setRatings(false)
        const response = await fetch(`http://localhost:3001/rating/${beerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginInfo.token}`,
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            setRatings(data)
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    }
    
    const SubmitRating = () => {
        const [ratingTitle, setRatingTitle] = useState("")
        const [ratingText, setRatingText] = useState("")
        const [ratingStars, setRatingStars] = useState(0)
        const [loading, setLoading] = useState(false)
        
        const submitRating = async (event) => {
            event.preventDefault()
            if (!ratingStars) return alert("Please select rating stars")
            
            setLoading("Submitting rating...")
            
            const ratingToSend = {
                rating_title: ratingTitle,
                rating_text: ratingText,
                rating_rate: ratingStars,
            }
            
            
            const response = await fetch('http://localhost:3001/rating/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginInfo.token}`,
                },
                body: JSON.stringify({
                    rating: ratingToSend,
                    beer_id: beer.beer_id,
                    user_id: loginInfo.user_id
                }),
            });
            
            if (response.ok) {
                ratingsLoaded = false
                loadRatings()
                setRatingTitle("")
                setRatingText("")
                setRatingStars(0)
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }

            setLoading(false)
        }


        return (
            <Card style={{background: "#ffffff11", marginBottom: 25}} hidden={!ratings}>
                <Card.Header>
                    <h2>Submit Rating</h2>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={submitRating} style={{padding: 25, width: "33%"}}>
                        <label>Rating title</label>
                        <input className='form-control' placeholder='Enter title' type='text' required onChange={(event) => setRatingTitle(event.target.value)} value={ratingTitle} />
                        <label>Rating description</label>
                        <textarea className='form-control' placeholder='Enter description' type='textarea' required onChange={(event) => setRatingText(event.target.value)} value={ratingText} />
                        <label>Rating stars</label>
                        {[...Array(5).keys()].map((i) => {
                            return <Star key={i} onClick={() => setRatingStars(i+1)} active={i < ratingStars} />
                        })}
                        <br/>
                        <button className='btn btn-primary' disabled={loading}>{loading || "Submit Rating"}</button>
                    </form>
                </Card.Body>
            </Card>
        )
    }
    
    const RateBeer = () => {
        var hasUserRated = ratings && ratings.find(rating => rating.user_id === loginInfo?.user_id)
        
        return (
            <div>
                <div style={{padding: 25}}>
                    {ratings ? <><h2>{ratings.length === 0 ? "No ratings to show" : "Ratings"}</h2>{ratings.map(rating => {
                        return (
                            <Card key={rating.rating_id} style={{background: "#ffffff22", width: "30%", display: "inline-block", margin: 5}}>
                                <Card.Header>
                                    {rating.user_name} — &nbsp;
                                    {[...Array(rating.rating_rate).keys()].map((i) => <span key={i} style={{color: "yellow"}}>{starCh}</span>)}
                                    {[...Array(5-rating.rating_rate).keys()].map((i) => <span key={i} style={{color: "grey"}}>{starCh}</span>)}
                                    <i>&nbsp;{rating.rating_rate}/5</i>
                                </Card.Header>
                                <Card.Body>
                                    <b><i><h3>"{rating.rating_title}"</h3></i></b>
                                    <i>{rating.rating_text.split("\n").map(a => <span key={Math.random()}>{a}<br/></span>)}</i>
                                    <sub style={{color: 'grey'}}>— {rating.user_name}</sub>
                                </Card.Body>
                            </Card>
                        )
                    })}</> : "Loading ratings..."}
                </div>
                {(loginInfo.user_id && !hasUserRated) && <SubmitRating />}
            </div>
        )

    }
    
    const loadBeer = async () => {
        if (beer) return    
        const response = await fetch(`http://localhost:3001/beers/view/${beerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginInfo.token}`,
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            setBeer(data)
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert("An error occured: " + (errorData.error || errorData.message))
        }
    }
    
    useEffect(() => {
        loadBeer()
        loadRatings()
    }, [])
    
    return (
        <div className='beers-container'>
            <div>
                <div>
                    {beer ? <div className='beer-section' style={{display: "flex", flexDirection: "row"}}>
                        <img alt="" src={beer.beer_image} height={300} width={300} style={{objectFit: "cover", borderRadius: "25px"}} />
                        <div style={{padding: 25}}>
                            <h1>{beer.beer_name}</h1>
                            {!beer.is_approved && <span style={{color: "red"}}>Pending Approval</span>}
                        </div>
                    </div> : "Loading beer info..."}
                </div>
            {beer.is_approved && <RateBeer />}
            </div>
        </div>
    )
}

export default ViewBeer;
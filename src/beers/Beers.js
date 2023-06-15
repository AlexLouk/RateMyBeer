import React, { Component, useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './Beers.css';
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom';

const Beers = () => {
    const { loginInfo } = useContext(AppContext)
    
    const [beersList, setBeersList] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    
    const loadBeers = async () => {
        setBeersList(false)
        const response = await fetch(`http://localhost:3001/beers/${loginInfo.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginInfo.token}`,
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            setBeersList(data)
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            setErrorMessage(errorData.error)
        }
    }

    const deleteBeer = async (beer_id) => {
        if (!window.confirm("Are you sure you want to delete the selected beer?")) return

        const response = await fetch('http://localhost:3001/beers/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginInfo.token}`,
            },
            body: JSON.stringify({
                beer_id
            }),
        });
        
        if (response.ok) {
            const data = await response.json();
            alert("Beer was deleted successfully.")
            loadBeers()
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    }
    
    useEffect(() => {
        loadBeers()
    }, [])

    const AddBeer = () => {
        const [loading, setLoading] = useState(false)
        const [beerName, setBeerName] = useState("")
        const [beerImgUrl, setBeerImgUrl] = useState("")
        const [errorMessage, setErrorMessage] = useState(false)

        const submitAddBeer = async (event) => {
            event.preventDefault()

            setErrorMessage("")
            setLoading("Adding beer...")

            const response = await fetch('http://localhost:3001/beers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginInfo.token}`,
                },
                body: JSON.stringify({
                    beer_name: beerName,
                    beer_image: beerImgUrl
                }),
            });
            
            if (response.ok) {
                const data = await response.json();
                alert(`Beer added. Your beer "${data.beer_name}" is now pending for approval.`)
                loadBeers()
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }

        }
        
        return (
            <div className='beers-section'>
                <h3>Add a beer</h3>
                <form onSubmit={submitAddBeer} >
                    <input required type='text' onChange={(event) => setBeerName(event.target.value)} value={beerName} placeholder='Name' />
                    <input required type='text' onChange={(event) => setBeerImgUrl(event.target.value)} value={beerImgUrl} placeholder='Image URL' />
                    <br />
                    {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
                    <Button onClick={submitAddBeer} variant="primary" disabled={loading}>{loading || "Add Beer"}</Button>
                </form>
            </div>
        )
    }
    
    return (
        <div className='beers-container'>
            <div>
                <AddBeer />
                <div className='beers-section' style={{maxWidth: "100%"}}>
                    <h3>Your beers</h3>
                    {beersList ? <Table striped>
                        <thead>
                            <tr>
                                <th width={125}>Image</th>
                                <th>Name</th>
                                <th>Approved</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {beersList.map(beer => (
                            <tr key={beer.beer_id}>
                                <td>
                                    <img style={{borderWidth: "2px", borderColor: "#88888888", borderStyle: "solid",  padding: 0, borderRadius: "10px"}} src={beer.beer_image} height={100} width={100} />
                                </td>
                                <td><Link to={beer.beer_id+""}>{beer.beer_name}</Link></td>
                                <td>{beer.is_approved ? "Approved" : "Pending approval"}</td>
                                <td>
                                    <Button onClick={() => deleteBeer(beer.beer_id)} variant='outline-danger'>Delete</Button>
                                </td>
                            </tr>    
                        ))}
                        </tbody>
                    </Table> : (errorMessage || "Loading beers...")}
                </div>
            </div>
        </div>
    )
}

export default Beers;


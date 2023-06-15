import { useContext, useEffect, useState } from 'react';
import './Admin.css';
import { AppContext } from '../AppContext';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';

const Admin = () => {
    const { loginInfo } = useContext(AppContext)

    const DeleteUserSection = () => {
        const [username, setUsername] = useState('')
        const [loading, setLoading] = useState(false)
        const [errorMessage, setErrorMessage] = useState(false)

        const onDeleteUserFormSubmit = async (event) => {
            event.preventDefault()

            if (!window.confirm("Are you sure you want to delete this user? Following items related to this account will also be deleted\n\n- Ratings on beers\n- Created beers")) return;
            setLoading("Deleting user...")
            setErrorMessage("")

            const response = await fetch(`http://localhost:3001/user/deleteUser/${username}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginInfo.token}`,
                },
                body: JSON.stringify({

                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`User ${username} was deleted successfully`)
            } else {
                const errorData = await response.json();
                alert('Error: ' + errorData.error);
                console.error('Error:', errorData);
                setErrorMessage(errorData.error)
            }

            setLoading(false)

        }

        return (
            <div className='admin-section'>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <h2>Delete user</h2>
                <form onSubmit={onDeleteUserFormSubmit} className='admin-sections-center' style={{ flexDirection: "column" }}>
                    <label>Enter username to delete:</label>
                    <input type='text' placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)} />
                    <button className='form-button red' disabled={loading}>{loading || "Delete user"}</button>

                </form>
            </div>
        )
    }

    const BeersApproval = () => {
        const [beersList, setBeersList] = useState(false)
        const [errorMessage, setErrorMessage] = useState(false)

        const loadBeers = async () => {
            setBeersList(false)
            const response = await fetch(`http://localhost:3001/beers/`, {
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

        useEffect(() => {
            loadBeers()
        }, [])


        const approveBeer = async (beer_id) => {
            if (!window.confirm("Are you sure you want to approve the selected beer?")) return

            const response = await fetch('http://localhost:3001/beers/approve', {
                method: 'post',
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
                alert("Beer was approved.")
                loadBeers()
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
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

        return (
            <div className='admin-section'>
                <h3>Approve user beers</h3>
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
                                    <img style={{ borderWidth: "2px", borderColor: "#88888888", borderStyle: "solid", padding: 0, borderRadius: "10px" }} src={beer.beer_image} height={100} width={100} />
                                </td>
                                <td>{beer.beer_name}</td>
                                <td>{beer.is_approved ? "Approved" : "Pending approval"}</td>
                                <td>
                                    {!beer.is_approved && <Button onClick={() => approveBeer(beer.beer_id)} variant='outline-primary'>Approve</Button>}
                                    <Button onClick={() => deleteBeer(beer.beer_id)} variant='outline-danger'>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> : (errorMessage || "Loading beers...")}
            </div>
        )
    }

    const PostNews = () => {
        const [newsTitle, setNewsTitle] = useState('')
        const [newsText, setNewsText] = useState('')
        const [newsImage, setNewsImage] = useState('')
        const [newsDate, setNewsDate] = useState((new Date()).toLocaleDateString().split("/").sort((a, b) => -1).join("-"))
        const [loading, setLoading] = useState(false)

        const submitPostNews = async (event) => {
            event.preventDefault()
            setLoading("Posting...")

            const dataToSend = {
                news_title: newsTitle,
                news_text: newsText,
                news_date: newsDate,
                news_image: newsImage
            }

            console.log(dataToSend)

            const response = await fetch('http://localhost:3001/news/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginInfo.token}`,
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setNewsTitle('')
                setNewsText('')
                setNewsImage('')
                setNewsDate((new Date()).toLocaleDateString().split("/").sort((a, b) => -1).join("-"))
                alert("The news was posted.")
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
            setLoading(false)
        }

        return <div className='admin-section'>
            <h3>Post news</h3>
            <form onSubmit={submitPostNews}>
                <input className='form-control' type='text' required onChange={(event) => setNewsTitle(event.target.value)} value={newsTitle} placeholder='Title' />
                <textarea className='form-control' required onChange={(event) => setNewsText(event.target.value)} value={newsText} placeholder='Text' />
                <input className='form-control' type='text' required onChange={(event) => setNewsImage(event.target.value)} value={newsImage} placeholder='Image URL' />
                <input className='form-control' type='date' required onChange={(event) => setNewsDate(event.target.value)} value={newsDate} placeholder='Date' />

                <input className='form-control btn btn-primary' type='submit' disabled={loading} value={loading || "Submit"} />
            </form>
        </div>
    }

    return (
        <div className='admin-container'>
            <div>
                <h2>Admin panel</h2>

                <div className='admin-sections-center'>
                    <DeleteUserSection />
                    <BeersApproval />
                    <PostNews />
                </div>
            </div>
        </div>
    )
}

export default Admin
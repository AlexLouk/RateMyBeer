import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import './Search.css'

function Search() {
    const { searchQuery } = useParams()
    const [newsResults, setNewsResults] = useState(false)
    const [beerResults, setBeerResults] = useState(false)

    const loadNewsResults = async () => {
        setNewsResults(false)
        const response = await fetch(`http://localhost:3001/news/search/${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("news results: ", data)
            setNewsResults(data)
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }

    }

    const loadBeerResults = async () => {
        setBeerResults(false)
        const response = await fetch(`http://localhost:3001/beers/search/${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("beer results: ", data)
            setBeerResults(data)
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }

    }

    useEffect(() => {
        loadNewsResults()
        loadBeerResults()
    }, [searchQuery])

    return (
        <div className="search-container">
            <div>
                <h1>Search results for "{searchQuery}"</h1>
                <p>{!newsResults && `Searching for "${searchQuery}" in news...`}</p>
                <p>{!beerResults && `Searching for "${searchQuery}" in beers...`}</p>
                {(newsResults && newsResults.length > 0) && <><h3>News results:</h3><Table striped borderless hover>
                    <tbody>
                        {newsResults?.map(result => {
                            return <tr key={result.news_id}>
                                <td style={{ padding: 25 }}>
                                    <Link to={'/news/' + result.news_id}><h3>{result.news_title}</h3></Link>
                                    <span>{result.news_text}</span>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table></>}
                {(beerResults && beerResults.length > 0) && <><h3>Beers results:</h3><Table striped borderless hover>
                    <thead>
                        <tr>
                            <th width={125}></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {beerResults?.map(result => {
                            return <tr key={result.beer_id}>
                                <td><Link to={'/beers/' + result.beer_id}><img src={result.beer_image} width={100} height={100} style={{ borderRadius: 10 }} /></Link></td>
                                <td><Link to={'/beers/' + result.beer_id}><h3>{result.beer_name}</h3></Link></td>
                            </tr>
                        })}
                    </tbody>
                </Table></>}

                {(newsResults.length == 0 && beerResults.length == 0) && "No results."}
            </div>
        </div>
    )
}

export default Search
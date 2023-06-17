import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SearchBar() {
    const navigator = useNavigate()
    const [search, setSearch] = useState('')

    const searchSubmit = (event) => {
        event.preventDefault()
        navigator('/search/' + search)
        setSearch('')
    }

    return (
        <div>
            <form onSubmit={searchSubmit}>
                <input required className="nav-search" type="text" onChange={(event) => setSearch(event.target.value)} value={search} placeholder="Search" />
            </form>
        </div>
    )
}

export default SearchBar
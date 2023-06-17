import Button from "react-bootstrap/Button"

const { useState, useContext, useEffect } = require("react")
const { AppContext } = require("../AppContext")

const LikeButton = ({ news }) => {     
    const { loginInfo } = useContext(AppContext)
    
    const [newsLikes, setNewsLikes] = useState(news.news_likes)
    const [newsLiked, setNewsLiked] = useState(newsLikes.includes(loginInfo.user_id))
    const [loading, setLoading] = useState(false)
    
    const likeNews = async () => {
        setLoading("Loading...")

        const response = await fetch('http://localhost:3001/news/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginInfo.token}`,
            },
            body: JSON.stringify({
                news_id: news.news_id
            }),
        });
        
        if (response.ok) {
            const data = await response.json();
            setNewsLikes(data)
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
        setLoading(false)
    }

    useEffect(() => {
        setNewsLiked(newsLikes.includes(loginInfo.user_id))
    }, [newsLikes])
    
    return (<>
        <p>{newsLikes.length} likes</p>
        <Button onClick={likeNews} disabled={loading} variant={newsLiked ? "outline-primary" : "primary"}>{loading || (newsLiked ? "Unlike" : "Like")}</Button>
    </>)
}

export default LikeButton
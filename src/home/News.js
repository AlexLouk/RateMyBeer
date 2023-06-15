import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './News.css';
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { AppContext } from "../AppContext";
import LikeButton from "../components/LikeButton";

const News = () => {
    const { loginInfo } = useContext(AppContext)

    const { newsId } = useParams()
    const [news, setNews] = useState(false)
    const [comments, setComments] = useState(false)

    const loadNews = async () => {
        if (news) return
        setNews(false)

        const response = await fetch('http://localhost:3001/news/' + newsId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginInfo.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            setNews(data[0])
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    }

    const loadComments = async (force) => {
        if (comments && !force) return

        const response = await fetch(`http://localhost:3001/news/${newsId}/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginInfo.token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            setComments(data)
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    }


    useEffect(() => {
        loadNews()
        loadComments()
    }, [])

    const NewsComments = () => {
        const [loading, setLoading] = useState(false)
        const [comment, setComment] = useState('')

        const submitComment = async (event) => {
            event.preventDefault()
            setLoading("Submitting...")

            const response = await fetch('http://localhost:3001/news/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loginInfo.token}`,
                },
                body: JSON.stringify({
                    comment_text: comment,
                    news_id: newsId,
                }),
            });

            if (response.ok) {
                alert("Your comment was posted.")
                loadComments(true)
                setComment("")
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }

            setLoading(false)

        }

        return (
            <div>
                <h2>{!comments ? "Loading comments..." : "Comments"}</h2>
                <div>
                    {comments && comments.map(comment => {
                        return <Card style={{ background: "#ffffff22", marginBottom: 25 }} key={comment.comment_id}>
                            <Card.Body>
                                {comment.comment_text}
                            </Card.Body>
                            <Card.Footer>
                                <span style={{ color: "grey" }}>By {comment.user_name}</span>
                            </Card.Footer>
                        </Card>
                    })}
                </div>
                <form onSubmit={submitComment} hidden={loginInfo.token == null}>
                    <h4>Submit a comment:</h4>
                    <div className="form-group">
                        <input required type="text" disabled={loading} className="form-control" placeholder="Enter comment" onChange={(event) => setComment(event.target.value)} value={comment} />
                        <input type="submit" disabled={loading} value={loading || "Submit"} className="btn btn-primary" style={{ float: "right" }} />
                    </div>
                </form>
            </div>
        )
    }

    return (<div className="news-container">
        {news ? <div>
            <div>
                <img src={news.news_image} width={"100%"} style={{ objectFit: "cover", margin: "50px 0", borderRadius: "25px" }} />
                <h1>{news.news_title}</h1>
                <br />
                <h5>{news.news_text}</h5>
            </div>
            <p style={{ color: "grey" }}>On {(new Date(news.news_date)).toLocaleDateString()}</p>
            {loginInfo.token == null ? "Log in to interact with news" : <>
                <LikeButton news={news} />{' '}
            </>}
            <hr />
            <NewsComments />
        </div> : "Loading news..."}
    </div>)
}



export default News
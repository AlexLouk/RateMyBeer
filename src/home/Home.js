import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Home.css';
import { Link } from 'react-router-dom'
import { AppContext } from '../AppContext'
import LikeButton from '../components/LikeButton';

function News() {
	const { loginInfo } = useContext(AppContext)
	const [newsList, setNewsList] = useState(false)


	const NewsBox = (props) => {
		const {
			news_id,
			news_title,
			news_text,
			news_date,
			news_image
		} = props

		const formattedNewsDate = (new Date(news_date)).toLocaleDateString()

		return <div className='news-boxes'>
			<Link to={'/news/' + news_id}>
				<img alt="" src={news_image} width={"100%"} height={150} style={{ objectFit: "cover" }} />
				<h2 className='news-title'>{news_title}</h2>
				<h3 className='news-content'>{news_text}</h3>
			</Link>
			<p className='news-meta'>On {formattedNewsDate}</p>
			{loginInfo.token == null ? "Log in to interact with news" : <>
				<LikeButton news={props} />{" "}
				<Button variant="primary">Comment</Button>
			</>}
			<hr className='hr-style' />
		</div>
	}

	const loadNews = async () => {
		if (newsList) return

		const response = await fetch('http://localhost:3001/news', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const data = await response.json();
			setNewsList(data)
		} else {
			const errorData = await response.json();
			console.error('Error:', errorData);
		}
	}

	useEffect(() => {
		loadNews()
	}, [])

	return (
		<div className="con">
			<div className='body'>
				<div className='news'>
					{newsList ? newsList.map(news => {
						return <NewsBox key={news.news_id} {...news} />
					}) : "Loading news..."}
				</div>
				<hr className='hr-style' />
			</div>
		</div>
	);
}

export default News;
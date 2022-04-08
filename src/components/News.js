import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const newsUpdate = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(60);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }
    
    const handlePrevClick = async () => {
        setPage(page-1)
        newsUpdate();
    }

    const handleNextClick = async () => { 
        setPage(page+1)
        newsUpdate()
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} News App`;
        newsUpdate();
    }, [])

    const fetchMoreData = async () => { 
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);  
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    return (
        <>
            <h2 className="text-center" style={{marginTop: '80px'}}>News App - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem 
                                    title={element.title ? element.title.slice(0, 60) : ''} 
                                    source={element.source ? element.source.name : 'Unknown'}
                                    desc = {element.description ? element.description.slice(0, 120) : ''} 
                                    imgUrl={element.urlToImage ?? 'https://images.moneycontrol.com/static-mcnews/2017/12/Sensex_BSE_Market_Nifty1-770x433.jpg'} 
                                    author={element.author?? 'Unknown'}
                                    date={element.publishedAt}
                                    newsUrl={element.url ?? 'https://www.moneycontrol.com/news/business/markets/dalal-street-week-ahead-10-key-factors-that-will-keep-traders-busy-next-week-31-8310681.html'}/>
                            </div>
                        })}   
                    </div>
                </div>
            </InfiniteScroll>    
            {/* <div className="container d-flex justify-content-between">
                <button type="button" className="btn btn-dark" disabled={page <= 1} onClick={handlePreviousClick}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" disabled={page + 1 > Math.ceil(.totalResults/props.pageSize)} onClick={handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    category: 'business',
    pageSize: 9
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}

export default News

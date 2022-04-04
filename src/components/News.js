import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'business',
        pageSize: 9
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            totalResults: 0,
            page: 1,
            loading: false
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} News App`;
    }

    async newsUpdate(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(60);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            page: this.state.page,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.newsUpdate();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            page: this.state.page,
            loading: false
        });

    };

    render() {
        return (
            <>
                <h2 className="text-center my-3">News App - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
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
                    <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News

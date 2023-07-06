import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  default = "https://th.bing.com/th/id/OIP.mdvZkRzpsDq0bIhPPaDZSAHaHa?pid=ImgDet&rs=1";

  constructor() {
    super();
    this.state = {
      articles: [],
      defaultImg: this.default,
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  // async updateNews() {
  //   // console.log(this.state.page);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true })
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //     page: this.state.page + 1
  //   })
  // }

  async componentDidMount() {
    this.props.setProgress(10);
    // this.updateNews();
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }

  // handlePrevClick = async () => {
  //   await this.setState({
  //     page: this.state.page - 1
  //   })
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   await this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.updateNews();
  // }

  fetchMoreData = async () => {
    ++this.state.page;
    console.log(this.state.page)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }

  render() {

    return (
      <>
        <h1 className='text-center my-5'>NewsApp- Top Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) + "..." : ""} description={element.description ? element.description.slice(0, 88) + "..." : ""} imageUrl={element.urlToImage ? element.urlToImage : this.state.defaultImg} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News

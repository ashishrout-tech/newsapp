import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [defaultImg, setDefaultImg] = useState("https://th.bing.com/th/id/OIP.mdvZkRzpsDq0bIhPPaDZSAHaHa?pid=ImgDet&rs=1");

  useEffect(() => {
    // let ignore = false;
    async function fetchData() {
      // if (!ignore) {
      props.setProgress(10);
      // this.updateNews();
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json()
      props.setProgress(60);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
      // }
    }
    fetchData();
    return () => {
      setPage(page + 1);
      // ignore = true;
      // ignore can be used for repeated calls (it's called when there's a change in param passed to it inside the [] braces, but in this case it's called twice because of strict mode, In the first call it accesses the fetchData(), but don't get inside cleanup function. In the second call, cleanup function is called and then the fetchData()). So, the cleanup function is called once.
    }

  }, [])



  // {// handlePrevClick = async () => {
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
  // }}



  const fetchMoreData = async () => {
    // console.log(`Before ${page}`); // same value as below

    setPage(page + 1); // here, it doesn't instantly increase the value by 1. It informs for the increment, and then moves onto next line. The result is seen in the next call. So, it's of no use to call set function at the beginning.
    //else in smart way, we can dircetly pass page+1 in &{page} in url below.
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)

    // console.log(`After ${page}`) // same value as above
  }

  return (
    <>
      <h1 className='text-center' style={{ margin: '35px', marginTop: '90px' }}>NewsApp- Top Headlines</h1>
      {/* {this.state.loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">

          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) + "..." : ""} description={element.description ? element.description.slice(0, 88) + "..." : ""} imageUrl={element.urlToImage ? element.urlToImage : defaultImg} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News

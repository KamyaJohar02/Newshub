import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor from news component ");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0a5ccc199f954a819ce79294ad76b365&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    console.log("previous");

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0a5ccc199f954a819ce79294ad76b365&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles, 
      loading: false
    });
  }

  handleNextClick = async () => {
    console.log("next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      // Do nothing or handle a case when it's the last page
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0a5ccc199f954a819ce79294ad76b365&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
            
      this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 style={{ textAlign: 'center' }}>Breaking News</h1>
         {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 15) : ""}
                  description={element.description ? element.description.slice(0, 55) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <input className="btn btn-dark" type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} value="Previous" />
          <input className="btn btn-dark" type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} value="Next" />
        </div>
      </div>
    );
  }
}

export default News;

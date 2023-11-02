import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="my-3">
          <div className="card" style={{ width: "18rem" }}>
            <img src={!imageUrl?"https://i.ytimg.com/vi/65srSr4I6Fs/maxresdefault.jpg":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}... </p>
              <a href={newsUrl ? "https://www.hindustantimes.com/ht-img/img/2023/10/19/1600x900/PTI10-19-2" : newsUrl}>
              <button type="button" class="btn btn-dark">Read More</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookList extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books"></div>
          <ol className="books-grid">

            <li>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: 'url(https://somesite/someimage.jpg)'}}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title"></div>
                <div className="book-authors"></div>
              </div>
            </li>

          </ol>
      </div>
    )
  }
}

BookList.propTypes = {
  bookShelfTitle: PropTypes.string.isRequired
}

export default BookList;
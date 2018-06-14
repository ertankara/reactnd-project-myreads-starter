import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
  render() {
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/' >Close search</Link>
            <div className="search-books-input-wrapper">
              <input
                onChange={ (e) => {this.props.onQueryInput(e.target.value) }}
                value={this.props.currentQuery}
                type="text"
                placeholder="Search by title or author" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {(Array.isArray(this.props.result) && this.props.currentQuery.length !== 0) &&
                this.props.result.map(book => {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                          <div className="book-shelf-changer">
                            <select
                              defaultValue={book.shelf}
                              onChange={(e) => {this.props.onChangeShelf(book, e.target.value)}}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  )
              })}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;
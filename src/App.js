import React from 'react'
import * as BooksAPI from './BooksAPI'
import Search from './Search';
import BookList from './BookList';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI
      .getAll().then(data => {
        console.log("DATA: ", data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookList bookShelfTitle="Currently Reading" />
              <BookList bookShelfTitle="Want to Read" />
              <BookList bookShelfTitle="Read" />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default BooksApp

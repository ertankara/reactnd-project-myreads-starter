import React from 'react'
import * as BooksAPI from './BooksAPI'
import Search from './Search';
import { Link, Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import './App.css'

class BooksApp extends React.Component {
  shelfChangeHandler = this.shelfChangeHandler.bind(this);
  searchQueryHandler = this.searchQueryHandler.bind(this);

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    allBooks: [],

    query: '',
    queryResult: []
  }

  getBooks() {
    const currentlyReading = [],
          wantToRead = [],
          read = [],
          allBooks = []

    BooksAPI.getAll()
    .then(books => {
      books.forEach(book => {
        if (book.shelf === 'currentlyReading') {
          currentlyReading.push(book);
        }
        else if (book.shelf === 'wantToRead') {
          wantToRead.push(book);
        }
        else if (book.shelf === 'read') {
          read.push(book);
        }
        // Gather all the books here no matter which shelf they're on
        allBooks.push(book)
      })
      this.setState({ currentlyReading, wantToRead, read, allBooks });
    })
    .catch(err => {
      console.error('Error occurred while fetching books from API', err);
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  shelfChangeHandler(book, newShelf) {
    BooksAPI.update(book, newShelf)
    // Re-render books with updated shelf
    this.getBooks()
  }

  timeout;
  searchQueryHandler(query) {
    this.setState({ query })
    if (!query) {
      return
    }

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      BooksAPI.search(query.trim())
      .then(searchResults => {
        console.log(searchResults)
        searchResults = searchResults.map(searchedBook => {
          let matchFound = false;
          for (const book of this.state.allBooks) {
            if (searchedBook.id === book.id) {
              matchFound = true;
              searchedBook.shelf = book.shelf
              break;
            }
          }
          if (!matchFound)
            searchedBook.shelf = 'none';

          return searchedBook;
        })

        this.setState({
          queryResult: searchResults
        })
      })
    }, 500)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks
                  onChangeShelf={this.shelfChangeHandler}
                  bookList={this.state.currentlyReading}
                  bookShelfTitle="Currently Reading" />
                <ListBooks
                  onChangeShelf={this.shelfChangeHandler}
                  bookList={this.state.wantToRead}
                  bookShelfTitle="Want to Read" />
                <ListBooks
                  onChangeShelf={this.shelfChangeHandler}
                  bookList={this.state.read}
                  bookShelfTitle="Read" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}>
        </Route>

        <Route exact path='/search' render={() => (
          <Search
            result={this.state.queryResult}
            currentQuery={this.state.query}
            onQueryInput={this.searchQueryHandler}
            onChangeShelf={this.shelfChangeHandler} />
        )} />
      </div>
    )
  }
}

export default BooksApp

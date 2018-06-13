import React from 'react'
import * as BooksAPI from './BooksAPI'
import Search from './Search';
import ListBooks from './ListBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    const currentlyReading = [],
          wantToRead = [],
          read = [];

    BooksAPI.getAll()
    .then(books => {
      console.log(books)
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
      })

      this.setState({ currentlyReading, wantToRead, read });

    })
    .catch(err => {
      console.error('Error occurred while fetching books from API');
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
              <ListBooks bookList={this.state.currentlyReading} bookShelfTitle="Currently Reading" />
              <ListBooks bookList={this.state.wantToRead} bookShelfTitle="Want to Read" />
              <ListBooks bookList={this.state.read} bookShelfTitle="Read" />
            </div>
          </div>
          <div className="open-search">
            <a>Add a book</a>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default BooksApp

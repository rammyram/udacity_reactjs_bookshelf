import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => { if (books) this.setState({ books }) }
    )
    console.log("component mounted")
  }
  getShelfBooks = (shelf) => {
    return this.state.books.filter(book => book.shelf.toLowerCase() === shelf.toLowerCase().split(" ").join(""))
  }
  moveToShelf = (book, shelf) => {

    let newBooks = [...this.state.books]
    newBooks = newBooks.filter(elem => elem.id !== book.id)
    book.shelf = shelf
    newBooks.push(book)

    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState({
          books: newBooks
        });
      }
      )
  }


  render() {

    const shelfs = ['Currently Reading', 'Want to Read', 'Read']
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks books={this.state.books} onMoveToShelf={this.moveToShelf}></SearchBooks>
        )}>
        </Route>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>{
                shelfs.map(shelf =>
                  <BookShelf key={shelf} shelf={shelf} books={this.getShelfBooks(shelf)}
                    onMoveToShelf={
                      this.moveToShelf}>
                  </BookShelf>
                )
              }
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'  >Add a book</Link>
            </div>
          </div>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
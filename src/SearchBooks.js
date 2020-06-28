import React from 'react'
import propTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
    static propTypes = {
        books: propTypes.array,
        onMoveToShelf: propTypes.func
    }

    state = {
        query: '',
        sBooks: [],
        isSearching: false
    }

    updateQuery = (e) => {

        this.setState({ query: e.target.value }, () => {
            this.searchBooks()
        })
    }

    searchBooks = () => {        
        console.log(this.state.query)
            if (this.state.query) {
                this.setState({ isSearching: true })
                BooksAPI.search(this.state.query)
                    .then(res => {
                        if (res.error) this.setState({ sBooks: [] })
                        else this.updateBooks(res)
                    })
            }
            else {
                this.setState({ sBooks: [] })
            }
    }

    updateBooks = (books) => {
        let sBooks = []
        books.forEach(book => {
            this.props.books.map( elem => {
                book.shelf= elem.id === book.id?elem.shelf:'none'
            } )
            sBooks.push(book)
        });
        this.setState({ sBooks:sBooks, isSearching: false })
    }

    render() {
        let { onMoveToShelf } = this.props
        console.log("SearchBook rendered")

        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'  >Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text"
                            value={this.state.query}
                            onChange={this.updateQuery}
                            placeholder="Search by title or author" />

                    </div>
                </div>
                {
                    this.state.isSearching ?
                        (<div className="loader" />)
                        :
                        (
                            <div className="search-books-results">
                                <ol className="books-grid">
                                    {
                                        this.state.sBooks.map(book =>
                                            (
                                                <li key={book.id}>
                                                    <Book book={book} onMoveToShelf={onMoveToShelf} ></Book>
                                                </li>
                                            )
                                        )
                                    }
                                </ol>
                            </div>
                        )
                }

            </div>
        )
    }
}

export default SearchBooks
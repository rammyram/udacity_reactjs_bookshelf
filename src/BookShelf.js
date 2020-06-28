import React from 'react'
import propTypes from 'prop-types'
import Book from './Book'



class BookShelf extends React.Component {
    static propTypes = {
        shelf: propTypes.string.isRequired,
        books: propTypes.array.isRequired
    }

    render() {
        
        const { shelf, books, onMoveToShelf } = this.props
        console.log("render BookList" , books.length)

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map(book =>
                                (
                                    <li key={book.id}>
                                        <Book book={book}  onMoveToShelf={onMoveToShelf} ></Book>
                                    </li>
                                )
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}


export default BookShelf;
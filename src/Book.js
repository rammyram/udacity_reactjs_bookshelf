import React from 'react'
import propTypes from 'prop-types'

class Book extends React.Component {
    static propTypes = {
        book: propTypes.object,
        onMoveToShelf: propTypes.func
    }
    render() {
        
        const { onMoveToShelf, book } = this.props        
        const { title, imageLinks, shelf, authors } = book
        console.log("render books"  )
        return (

            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={(e) => { console.log(e.target.value); onMoveToShelf(book, e.target.value) }}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>

        )
    }
}

export default Book; 
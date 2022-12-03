import React from "react";
import Book from "./Book";
import { shelfNames } from "../Shelve/Shelves";

const BookShelf = ({ shelf, ShelvesBooks, setBookShelf }) => {
  return (
    <div key={shelf} className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {ShelvesBooks
            .filter((books) => books.shelf === shelfNames[shelf])
            .map((books) => (
              <Book
                key={books.book.id}
                book={books.book}
                onUpdateShelf={setBookShelf}
                currentShelf={books.shelf}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import SearchPage from "./SearchPage";

function App() {
  const [ShelvesBooks, setShelvesBooks] = useState([]);

  React.useEffect(() => {
    const getAllBooks = async () => {
      const allBooks = await BooksAPI.getAll();
      allBooks.forEach((books) => {
        setShelvesBooks((ShelvesBooks) => [
          ...ShelvesBooks,
          { book: books, shelf: books.shelf },
        ]);
      });
    };
    getAllBooks();
    return () => {
      setShelvesBooks([]);
    };
  }, []);

  const setBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      const newBooksOnShelves = ShelvesBooks.map((books) => {
        if (books.book.id === book.id) {
          books.shelf = shelf;
        }
        return books;
      });
      setShelvesBooks(newBooksOnShelves);
      if (!ShelvesBooks.find((books) => books.book.id === book.id)) {
        setShelvesBooks((ShelvesBooks) => [
          ...ShelvesBooks,
          { book: book, shelf: shelf },
        ]);
      }
    });
  };

  return (
    <Routes className="app">
      <Route
        exact
        path="/"
        element={
          <ListBooks
            ShelvesBooks={ShelvesBooks}
            setBookShelf={setBookShelf}
          />
        }
      />
      <Route
        path="/search"
        element={
          <SearchPage
            ShelvesBooks={ShelvesBooks}
            setBookShelf={setBookShelf}
          />
        }
      />
    </Routes>
  );
}

export default App;

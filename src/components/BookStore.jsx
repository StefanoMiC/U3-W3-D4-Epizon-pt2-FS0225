import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";

const BookStore = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
      if (resp.ok) {
        let fetchedBooks = await resp.json();
        setBooks(fetchedBooks);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList books={books} />
      </Col>
      <Col lg={8}>
        <BookDetail />
      </Col>
    </Row>
  );
};

export default BookStore;

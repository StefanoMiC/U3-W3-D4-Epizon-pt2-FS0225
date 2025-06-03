import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { useDispatch } from "react-redux";
import { getBooksAction } from "../redux/action";

const BookStore = () => {
  // const [books, setBooks] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // getBooks();
    // al montaggio del componente si attiva l'action creator che internamente gestisce la fetch asincrona
    // nel frattempo questa dispatch rimane "congelata" in attesa della fine di quel processo
    // quando la dispatch interna all'action creator viene eseguita, sarà dichiarata la fine delle operazioni asincrone
    // e sarà quello il momento in cui QUESTA dispatch riceverà l'action da inviare al reducer
    dispatch(getBooksAction("https://striveschool-api.herokuapp.com/food-books"));
  }, []);

  // const getBooks = async () => {
  //   try {
  //     let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
  //     if (resp.ok) {
  //       let fetchedBooks = await resp.json();
  //       setBooks(fetchedBooks);
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList
        // books={books}
        />
      </Col>
      <Col lg={8}>
        <BookDetail />
      </Col>
    </Row>
  );
};

export default BookStore;

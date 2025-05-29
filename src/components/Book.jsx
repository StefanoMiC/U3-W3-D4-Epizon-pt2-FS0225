import { Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FaCartPlus } from "react-icons/fa";

const Book = ({ book }) => {
  const dispatch = useDispatch();
  const bookSelected = useSelector(state => state.bookSelected.content);

  return (
    <Card
      className={bookSelected?.id === book.id ? "border-2 border-primary mt-3" : "border-2 mt-3"}
      onClick={() => {
        dispatch({ type: "SELECT_BOOK", payload: book });
      }}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex">
        <img className="book-image" src={book.imageUrl} alt="book cover" />
        <div className="flex-grow-1">
          <Card.Text className="font-weight-bold">{book.title}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Badge bg="dark" className="mb-0">
              {book.price}€
            </Badge>

            <Button variant="success" className="btn-sm" onClick={() => dispatch({ type: "ADD_TO_CART", payload: book })}>
              <FaCartPlus />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Book;

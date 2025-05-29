import { Col, Row, Button, ListGroup } from "react-bootstrap";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART, removeFromCartAction } from "../redux/action";

const Cart = () => {
  const cart = useSelector(state => state.cart.content);

  const dispatch = useDispatch();
  return (
    <Row>
      <Col sm={12} className="font-weight-bold mb-5 ms-3">
        TOTAL: <span className="display-6 text-primary">{cart.reduce((acc, currentValue) => acc + parseFloat(currentValue.price), 0).toFixed(2)}€</span>
      </Col>
      <Col sm={12}>
        <ListGroup variant="flush">
          {cart.length > 0 ? (
            cart.map((book, i) => (
              <ListGroup.Item key={i} className="my-4">
                <Button
                  variant="danger"
                  onClick={() => {
                    // dispatch({ type: REMOVE_FROM_CART, payload: i });
                    dispatch(removeFromCartAction(i));
                  }}
                >
                  <FaTrash />
                </Button>
                <img className="book-cover-small" src={book.imageUrl} alt="book selected" />
                {book.title}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="lead ">
              <span className="text-primary opacity-50 fs-1 me-2">
                <FaShoppingCart />
              </span>
              Your cart is empty
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default Cart;

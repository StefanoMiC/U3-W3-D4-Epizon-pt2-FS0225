import { Alert, Col, Image, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartIndicator from "./CartIndicator";
import { useSelector } from "react-redux";

const TopBar = () => {
  const bookSelected = useSelector(state => state.bookSelected.content);
  const isBooksLoading = useSelector(state => state.books.isLoading);
  const hasError = useSelector(state => state.error.hasError);
  const errorMessage = useSelector(state => state.error.errorMessage);

  return (
    <>
      {hasError && <Alert variant="danger">{errorMessage}</Alert>}
      <Row className="gx-0">
        <Col sm={12} className="text-center background-div">
          <Link to="/" className="text-decoration-none">
            <h1 className="display-4 d-inline-block align-middle me-3">Epizon Book Store</h1>
          </Link>
          {bookSelected && (
            <div className="d-inline-block align-middle">
              <Image src={bookSelected.imageUrl} width="70" />
              <div>{bookSelected.title}</div>
            </div>
          )}
          {isBooksLoading && (
            <Spinner animation="border" variant="success" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <CartIndicator />
        </Col>
      </Row>
    </>
  );
};
export default TopBar;

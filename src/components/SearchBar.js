import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchBar = ({ handleSubmit, handleChange, searchValue }) => {
  return (
    <Row>
      <Col>
        <Form className="d-md-flex mb-3" onSubmit={handleSubmit}>
          <Form.Control
            className="me-2"
            type="text"
            placeholder="Search characters"
            onChange={handleChange}
            value={searchValue}
          />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default SearchBar;
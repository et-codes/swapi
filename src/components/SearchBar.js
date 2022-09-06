import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchBar = ({
  handleSubmit,
  handleChange,
  handleReset,
  searchValue
}) => {
  return (
    <Row>
      <Col>
        <Form className="d-md-flex mb-3" onSubmit={handleSubmit}>
          <Form.Control
            className="me-2"
            type="text"
            placeholder="Search character names"
            onChange={handleChange}
            value={searchValue}
          />
          <Button variant="primary" type="submit" className="me-2">
            Search
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default SearchBar;
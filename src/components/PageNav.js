import Button from 'react-bootstrap/Button';

const PageNav = ({ page, nextPage, prevPage, lastPage, gotoFirstPage, gotoLastPage }) => {
  return (
    <caption>
      <Button
        className="me-1"
        variant="secondary"
        size="sm"
        onClick={gotoFirstPage}
        disabled={page === '1' ? true : false}
      >
        {'|<'}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={prevPage}
        disabled={!prevPage ? true : false}
      >
        {'<'}
      </Button>
      <Button
        className="mx-1"
        variant="secondary"
        size="sm"
        disabled
      >
        {`Page: ${page}`}
      </Button>
      <Button
        className="me-1"
        variant="secondary"
        size="sm"
        onClick={nextPage}
        disabled={!nextPage ? true : false}
      >
        {'>'}
      </Button>
      <Button
        className="me-1"
        variant="secondary"
        size="sm"
        onClick={gotoLastPage}
        disabled={page === lastPage ? true : false}
      >
        {'>|'}
      </Button>
    </caption>
  );
}

export default PageNav;
import Button from 'react-bootstrap/Button';

const PageNav = ({ page, nextPage, prevPage }) => {
  return (
    <caption>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={prevPage}
        disabled={!prevPage ? true : false}
      >
        {'<'}
      </Button>
      <span className="px-2">{`Page: ${page}`}</span>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={nextPage}
        disabled={!nextPage ? true : false}
      >
        {'>'}
      </Button>
    </caption>
  );
}

export default PageNav;
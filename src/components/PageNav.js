import Button from 'react-bootstrap/Button';

const PageNav = (props) => {
  const {
    page,
    nextPage,
    prevPage,
    lastPage,
    gotoFirstPage,
    gotoLastPage
  } = { ...props };

  const disablePrev = (page === '1');
  const disableNext = (page === lastPage);

  return (
    <caption>
      <Button
        className="me-1"
        variant="secondary"
        size="sm"
        onClick={gotoFirstPage}
        disabled={disablePrev}
      >
        {'|<'}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={prevPage}
        disabled={disablePrev}
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
        disabled={disableNext}
      >
        {'>'}
      </Button>
      <Button
        className="me-1"
        variant="secondary"
        size="sm"
        onClick={gotoLastPage}
        disabled={disableNext}
      >
        {'>|'}
      </Button>
    </caption>
  );
}

export default PageNav;
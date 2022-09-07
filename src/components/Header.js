import swLogo from '../assets/sw-logo.svg';
import gitHubLogo from '../assets/github-logo.png';

const Header = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img src={swLogo} alt="Star Wars logo" width={'25%'} />
      <h1 className="me-auto ms-1">Character Search</h1>
      <a
        href='https://github.com/et-codes/swapi'
        target='_blank'
        rel="noreferrer noopener"
      >
        <img src={gitHubLogo} alt="GitHub logo" />
      </a>
    </div>
  );
}

export default Header;
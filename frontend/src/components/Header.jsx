import { Link, useNavigate } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">tft</Link>
      </div>
      <ul>
        <>
          <li>
            <Link to="/user">Profile</Link>
          </li>
        </>
      </ul>
    </header>
  );
}

export default Header;

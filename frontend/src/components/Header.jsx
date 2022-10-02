import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getTft } from '../features/tft/tftSlice';
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    dispatch(getTft(state));
    navigate('/user');
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">tft</Link>
      </div>
      <ul>
        <li>
          <Link to="/user">Profile</Link>
        </li>
      </ul>
      <div className="headerFormContainer">
        <form className="form" onSubmit={onSubmit}>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          <button type="submit">Find Summoner</button>
        </form>
      </div>
    </header>
  );
}

export default Header;

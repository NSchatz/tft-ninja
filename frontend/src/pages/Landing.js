import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getTft, reset } from '../features/tft/tftSlice';
import Matches from '../components/Matches';
import { useState, useEffect } from 'react';

function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    dispatch(getTft(state));
    navigate('/user');
  }
  return (
    <>
      <div className="formContainer">
        <form className="form" onSubmit={onSubmit}>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          <button type="submit">Find Summoner</button>
        </form>
      </div>
    </>
  );
}
export default Landing;

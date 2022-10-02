import './App.css';
import Landing from './pages/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Matches from './components/Matches';
import Header from './components/Header';
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/user" element={<Matches />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

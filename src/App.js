import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
{/* <Navbar />   */}

        <Routes>
          <Route exact path='/signup' element={<SignupPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/' element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path='/signup' element={<Signup />} /> */}
          {/* <Route path='/login' element={<Login />} /> */}
          <Route  path='/' element={<LandingPage />} />
          {/* <Route path="/explore"/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <LoginPage /> */}
        <Routes>
          <Route exact path='/signup' element={<SignupPage />} />
          <Route exact path='/login' element={<LoginPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

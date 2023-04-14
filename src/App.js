import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route exact path='/signup' element={<SignupPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/sidebar' element={<Sidebar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

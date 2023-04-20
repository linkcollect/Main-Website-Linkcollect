import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { setJwtInRequestHeader } from './api-services/httpService';

function App() {
  const [user, setUser] = useState();

  // To set JWT token in request header for authorization on each API call
  useEffect(() => {
    function init() {
      const token = localStorage.getItem("token");
      if (token) {
        setJwtInRequestHeader(token);
      }
    }

    init();
  }, [user]);

  // This function is passed as props to diff compoenents to set the user
  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login handleSetUser={handleSetUser} />} />
          <Route  path='/' element={<LandingPage />} />
          {/* <Route path="/explore"/> */}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

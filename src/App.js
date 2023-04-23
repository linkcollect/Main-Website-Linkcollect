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
import Privacy from './components/PrivacyPolicy/Privacy';
import Emailsent from './pages/Emailsent';
import Loginsucc from './pages/Loginsucc';
import Error from './pages/Error';
import NLCollectionView from './pages/NLCollectionView';
function App() {
  const [user, setUser] = useState();
  //for responsiveness
  let width
    if (typeof window !== "undefined") {
        width = window.innerWidth
    }
  const [windowWidth, setWindowWidth] = useState(width)


  // To set JWT token in request header for authorization on each API call
  useEffect(() => {
    function init() {
      const token = localStorage.getItem("token");
      if (token) {
        setJwtInRequestHeader(token);
      }
    }
    
          function watchWidth() {
              setWindowWidth(window.innerWidth)
          }
    
          window.addEventListener("resize", watchWidth)
    
    init();
  }, [user,windowWidth]);

  // This function is passed as props to diff compoenents to set the user
  const handleSetUser = (user) => {
    setUser(user);
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route  path='/' element={<LandingPage windowWidth={windowWidth}/>} />
          <Route  path='/privacy' element={<Privacy />} />
          <Route  path='/collection' element={<NLCollectionView />} />
          {/* <Route path="/explore"/> */}
          <Route path='/signup' element={user? <Navigate to="/:username"/> : <Signup/>} />
          <Route path='/login' element={user? <Navigate to="/:username"/>:<Login handleSetUser={handleSetUser} />} />
          {/* After creating the dash board we will use the dash board componet */}
          <Route path="/:username" element={user? <Loginsucc/> :  <Navigate to="/login"/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Privacy from "./components/PrivacyPolicy/Privacy";
import Bookmarks from "./pages/Bookmarks";
import Home from "./pages/Home";
import jwt from "jsonwebtoken"
import Settings from './components/Settings/Settings'
import { setJwtInRequestHeader } from "./api-services/httpService";
import Explore from "./pages/Explore";
import SavedCollection from './pages/SavedCollection';

function App() {
  const [user,setUser] = useState({})
  //for responsiveness
  let width;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }
  const [windowWidth, setWindowWidth] = useState(width);

  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener("resize", watchWidth);
  }, [windowWidth]);
  
  // To set JWT token in request header for authorization on each API call
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      const { userId,username } = jwt.decode(token);
      setJwtInRequestHeader(token)
      setUser({
        userId,username,isLoggedIn:true
      });
    }
  },[])

  const handleSetUser = (userId,username,isLoggedIn)=>{
    setUser({
      userId:userId,username:username,isLoggedIn:isLoggedIn
    });
  }
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page  */}
          <Route path="/" element={<LandingPage windowWidth={windowWidth} />} />

          <Route
            path="/signup"
            element={user.isLoggedIn ? <Navigate to={`/${user?.username}`} /> : <Signup windowWidth={windowWidth} />}
          />
          <Route
            path="/login"
            element={
              user.isLoggedIn ? (
                <Navigate to={`/${user?.username}`} />
              ) : (
                <Login handleSetUser={handleSetUser} windowWidth={windowWidth}/>
              )
            }
          />
          <Route
            path="/:username"
            element={<Home user={user} windowWidth={windowWidth} handleSetUser={handleSetUser}/> }
          />
           <Route path="/explore" element={<Explore/>} />
           <Route path="/saved" element={<SavedCollection/>} />
           
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/:username/c/:collectionId" element={<Bookmarks user={user} handleSetUser={handleSetUser}  windowWidth={windowWidth}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
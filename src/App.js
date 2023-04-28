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
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken"
import { authSuccess } from "./actions/authActions";
import { setJwtInRequestHeader } from "./api-services/httpService";
function App() {
  const [user, setUser] = useState();
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  //for responsiveness
  let width;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }
  const [windowWidth, setWindowWidth] = useState(width);

  // To set JWT token in request header for authorization on each API call
  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", watchWidth);
  }, [windowWidth]);

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      const { userId,username } = jwt.decode(token);
      setJwtInRequestHeader(token)
      dispatch(authSuccess({
      token: token,
      user: { userId: userId, username: username },
    }))
    setUser({userId, username})
    }
  },[])
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page  */}
          <Route path="/" element={<LandingPage windowWidth={windowWidth} />} />

          <Route
            path="/signup"
            element={auth.token ? <Navigate to={`/${user?.username}`} /> : <Signup />}
          />
          <Route
            path="/login"
            element={
              auth.token ? (
                <Navigate to={`/${user?.username}`} />
              ) : (
                <Login/>
              )
            }
          />
          <Route
            path="/:username"
            element={<Home /> }
            />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/c/:collectionId" element={<Bookmarks />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
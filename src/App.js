import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';

import Home from './pages/Home';
import Sidebar from './components/Sidebar/Sidebar'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route  path='/' element={<Home />} />
          <Route path="/explore"/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

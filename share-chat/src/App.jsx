import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
  const location = useLocation();
  const { username, avatar } = location.state || { username: 'Guest', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' };

  return (
    <div className="app">
      <Sidebar username={username} />
      <Feed username={username} avatar={avatar} />
      
    </div>
  );
}

export default App;

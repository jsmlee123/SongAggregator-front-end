import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Search from './Search';
import Home from './Home';
import Results from './Search/Results';
import NavBar from './Navigation';
import './global.css'
import Profile from './Profile';
import EditProfile from './Profile/edit';
import Details from './Details';
import AllUsers from './Profile/allUsers';

function App() {
  return (
    <div>
      <HashRouter>
        <NavBar/>
        <div className='content-container'>
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="EditProfile" element={<EditProfile />} />
            <Route path="AllUsers" element={<AllUsers />} />
            <Route path="Search" element={<Search />} />
            <Route path="Results/:searchCriteria/*" element={<Results />} />
            <Route path='Details/:artistName/:songName'element={<Details />}/>
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;

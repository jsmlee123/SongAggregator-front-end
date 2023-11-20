import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Search from './Search';
import Home from './Home';
import Results from './Search/Results';
import NavBar from './Navigation';
import './global.css'

function App() {
  return (
    <div>
      <HashRouter>
        <NavBar/>
        <div className='content-container'>
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Search" element={<Search />} />
            <Route path="Results/:searchCriteria/*" element={<Results />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;

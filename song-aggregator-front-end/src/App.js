import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Search from './Search';
import Home from './Home';
import Results from './Search/Results';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="results/:searchCriteria/*" element={<Results />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

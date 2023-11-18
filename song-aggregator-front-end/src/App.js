import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import SearchBar from './Search';
import Home from './Home';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Search" element={<SearchBar />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

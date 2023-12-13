import './App.css';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import Search from './Search';
import Home from './Home';
import Results from './Search/Results';
import NavBar from './Navigation';
import './global.css';
import Profile from './Profile';
import EditProfile from './Profile/edit';
import Details from './Details';
import AllUsers from './Profile/allUsers';

import Signin from './Users/signin';
import Signup from './Users/signup';
import { useState, useEffect } from 'react';
import AddSong from './Profile/addSong';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from './store';

//testing authentication

function App() {
 
  return (
    <Provider store={store}>
      <div>
        <HashRouter>
          <NavBar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home/>} />
              <Route path="Profile" element={<Profile />} />
              <Route path="Profile/:userId" element={<Profile />} />
              <Route path="EditProfile/:userId" element={<EditProfile />} />
              <Route path="AllUsers" element={<AllUsers />} />
              <Route path="AddSong/:userId" element={<AddSong />} />
              <Route path="Search" element={<Search />} />
              <Route path="Results/:searchCriteria/*" element={<Results />} />
              <Route
                path="Details/:artistName/:songName"
                element={<Details />}
              />

              <Route path="Login" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </div>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;

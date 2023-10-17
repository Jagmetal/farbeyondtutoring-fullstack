import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MusicLessons from '../pages/MusicLessons';
import TabDownload from '../pages/TabDownload';
import BookNow from '../pages/BookNow';
import Login from '../components/Login';
import Profile from '../components/Profile';
import PrivateRoute from '../routes/PrivateRoute';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/music-lessons" element={<MusicLessons />} />
      <Route path="/tab-download" element={<TabDownload />} />
      <Route path="/login" element={<Login />} />

      <Route path="/book-now" element={<PrivateRoute />}>
        <Route index element={<BookNow />} />
      </Route>

      <Route path="/profile" element={<PrivateRoute />}>
        <Route index element={<Profile />} />
      </Route>
    </Routes>
  );
};


export default AppRoutes;



import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import BooksList from '../components/BooksList';
import BookComponent from '../components/BookComponent';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route component={BooksList} path="/" exact/>
            <Route component={BookComponent} path="/add" />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
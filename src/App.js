import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InstagramFeed from './InstagramFeed';
import InstagramNewFeed from './InstagramNewFeed';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <div className="App">
    <Router basename="/liyao-instagram-updates">
      <Routes>
        <Header />
          <main className="container my-5">
            <Route path="/" element={<InstagramFeed />} />
            <Route path="/post/:id" element={<InstagramNewFeed />} />
        <Footer />
      </Routes>
    </Router>
  </div>
);

export default App;

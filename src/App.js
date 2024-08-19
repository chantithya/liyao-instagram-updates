import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstagramFeed from './components/InstagramFeed';
import InstagramNewFeed from './components/InstagramNewFeed';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="container my-5">
          <Routes>
            <Route path="/" element={<InstagramFeed />} />
            <Route path="/post/:id" element={<InstagramNewFeed />} /> {/* Correct path */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

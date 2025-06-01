import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './song/main-page/mainPage';
import Navbar from './components/Navbar';
import ChordList from './chords/ChordList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chords" element={<ChordList />} />
      </Routes>
    </Router>
  );
}

export default App;
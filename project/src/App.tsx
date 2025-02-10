import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import CV from './pages/CV';
import RequestLogo from './pages/RequestLogo';
import Contact from './pages/Contact';
import { useTheme } from './hooks/useTheme';
import './i18n';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300`}>
      <Router>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/request" element={<RequestLogo />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
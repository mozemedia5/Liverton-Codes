import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { incrementVisits } from './lib/firestore';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Applications from './pages/Applications';
import AppPreview from './pages/AppPreview';
import About from './pages/About';
import Contact from './pages/Contact';
import Order from './pages/Order';
import Donation from './pages/Donation';
import DataAnalysis from './pages/DataAnalysis';

import './App.css';

function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }

    // Increment visits
    incrementVisits().catch(console.error);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Public Routes - With Navigation/Footer */}
          <Route path="*" element={
            <>
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/applications" element={<Applications />} />
                  <Route path="/preview/:appId" element={<AppPreview />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/donate" element={<Donation />} />
                  <Route path="/data-analysis" element={<DataAnalysis />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

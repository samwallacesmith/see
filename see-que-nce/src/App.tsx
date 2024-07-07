import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Review from './pages/Review'; 
import SubmitReview from './pages/SubmitReview';
import ArticlePage from './pages/ArticlePage';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/review/:id" element={<Review />} />
                    <Route path="/submit-review" element={<SubmitReview />} />
                    <Route path="/article/:type/:id" element={<ArticlePage />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
};

export default App;

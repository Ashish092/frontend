import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './components/FAQ';
import FAQManager from './components/admin/FAQManager';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FAQ />} />
                <Route path="/admin/faqs" element={<FAQManager />} />
            </Routes>
        </Router>
    );
}

export default App; 
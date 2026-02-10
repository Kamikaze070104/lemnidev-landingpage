import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* Placeholder routes for others */}
        <Route path="about" element={<div className="p-8">About Page (Coming Soon)</div>} />
        <Route path="work" element={<div className="p-8">Work Page (Coming Soon)</div>} />
        <Route path="services" element={<div className="p-8">Services Page (Coming Soon)</div>} />
        <Route path="contact" element={<div className="p-8">Contact Page (Coming Soon)</div>} />

        <Route path="*" element={<div className="p-8 text-center text-xl">404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;

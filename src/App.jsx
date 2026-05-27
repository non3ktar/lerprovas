import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Settings, Home, Camera } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Evaluator from './pages/Evaluator';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans">
        
        <header className="glass sticky top-0 z-50 px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gradient">
            <span className="text-2xl">✨</span> Avaliador LPT
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="text-slate-400 hover:text-brand-400 transition-colors">
              <Home size={24} />
            </Link>
            <Link to="/evaluate" className="text-slate-400 hover:text-brand-400 transition-colors">
              <Camera size={24} />
            </Link>
            <Link to="/settings" className="text-slate-400 hover:text-brand-400 transition-colors">
              <Settings size={24} />
            </Link>
          </nav>
        </header>

        <main className="flex-1 p-4 max-w-4xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/evaluate" element={<Evaluator />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        
        <footer className="py-6 text-center text-slate-500 text-sm">
          Avaliador PWA • Antigravity Vibe Coding
        </footer>
      </div>
    </Router>
  );
}

export default App;

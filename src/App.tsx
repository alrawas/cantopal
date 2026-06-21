import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BrowsePage from './pages/BrowsePage';
import PracticePage from './pages/PracticePage';
import TranslatePage from './pages/TranslatePage';
import SettingsPage from './pages/SettingsPage';
import AddPhrasePage from './pages/AddPhrasePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/add" element={<AddPhrasePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

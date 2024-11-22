import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

import UsuariosPage from './pages/UsuarioPage';
import ApuestasPages from './pages/ApuestasPages';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/usuarios" />} /> 
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/apuestas" element={<ApuestasPages />} />
            <Route path="*" element={<p>Página no encontrada</p>} /> 
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  </Provider>
);

export default App;

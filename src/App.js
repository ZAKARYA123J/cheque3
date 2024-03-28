// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import ListeCompte from './components/compte/ListeCompte';
import Listebanque from './components/banque/lListe';
import './App.css'; // Import CSS file for layout styling
import ListeCarnet from './components/carnet/ListeCarnet';
import Suivi from './components/suivi/Suivi';
function App() {
  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <div className="container">
          <Sidebar/>
          <div className="content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="compte" element={<ListeCompte />} />
              <Route path="banque" element={<Listebanque />} />
              <Route path="carnet" element={<ListeCarnet />} />
              <Route path="cheque" element={<Suivi />} />
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

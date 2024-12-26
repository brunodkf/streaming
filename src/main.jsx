import React from 'react'
import ReactDOM from 'react-dom/client'

import { StreamingProvider } from './context/StreamingContext.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Destaque from './pages/Destaque';
import Search from './pages/Search';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StreamingProvider>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='destaque' element={<Destaque />} />
            <Route path='search' element={<Search />} />
          </Route>
        </Routes>
      </StreamingProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

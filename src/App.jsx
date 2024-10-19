import { Outlet } from 'react-router'
import { Navbar } from './components/Navbar'

import './App.css'
import Menu from './components/Menu'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="App">
      <ScrollToTop/>
      
      <Navbar />

      <Outlet />
      
      <Menu/>
    </div>
  )
}

export default App

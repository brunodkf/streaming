import { Outlet } from 'react-router'
import { Navbar } from './components/Navbar'

import './App.css'
import Menu from './components/Menu'

function App() {
  return (
    <div className="App">
      <Navbar />

      <Outlet />
      
      <Menu/>
    </div>
  )
}

export default App

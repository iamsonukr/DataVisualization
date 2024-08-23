import Navbar from './components/Navbar/Navbar'
import { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [menu,setMenu]=useState("home");

  return (
    <>
    <Navbar menu={menu} setMenu={setMenu}/>
    <Dashboard  menu={menu} setMenu={setMenu}/>

    </>
  )
}

export default App

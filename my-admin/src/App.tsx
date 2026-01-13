import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Tables from './pages/Tables'
import {Dishes} from './pages/Dishes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='dishes' element={<Dishes />} />
          <Route path='orders' element={<Orders />} />
          <Route path='tables' element={<Tables />} />
        </Route>
      </Routes>l
    </BrowserRouter>
  )
}

export default App

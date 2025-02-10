import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Schema from './pages/Schema'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schema/:id" element={<Schema />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css'

import { Route, Routes , BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from './components/Homepage'
import Room from './Room'
import { RecoilRoot } from 'recoil'

function App() {
  return(
    <div className='bg-stone-800 h-screen w-full'>
      <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </Router>
    </RecoilRoot>
    </div>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NabBar from './components/NavBar'
import Profile from './components/profile/profile'

function App() {

  //Default pohja. element={<Profile/>} korvattavissa fiksummalla vaihtoehdolla.
  return (
    <BrowserRouter>
      <div className="App">
        <NabBar />
        <Routes>
          <Route path='/' element={<Profile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

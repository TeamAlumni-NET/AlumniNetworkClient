import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NabBar from './components/NavBar'
import Profile from './components/profile/profile'
import { login } from './reducers/authenticationSlice'

function App() {
  const dispatch = useDispatch()
  const {username} = useSelector((state) => state.username)
  const { keycloak, initialized } = useKeycloak()


  useEffect(() => {
    if (keycloak.authenticated && !localStorage.getItem("token")) {
      localStorage.setItem("token", keycloak.token)
      dispatch(login(keycloak.token))
    }
    if (localStorage.getItem("token") !== null && username === "") {
      dispatch(login(localStorage.getItem("token")))
    }
  }, [keycloak, initialized])

  //Default pohja. element={<Profile/>} korvattavissa fiksummalla vaihtoehdolla.
  return (
    <BrowserRouter>
      <div className="App">
        <NabBar keycloak = {keycloak}/>
        <Routes>
          <Route path='/' element={<Profile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

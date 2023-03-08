import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NabBar from './components/NavBar'
import Profile from './components/profile/profile'
import GroupList from './components/GroupList'
import TopicList from "./components/TopicList"
import { Button, MenuItem, Select } from "@mui/material"
import { strings } from "./utils/localization"

function App() {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) changeLanguageHandler(savedLanguage)
  })

  const changeLanguageHandler = (lang) => {
    setLanguage(lang)
    strings.setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  //Default pohja. element={<GroupList/>} korvattavissa fiksummalla vaihtoehdolla.
  return (
    <BrowserRouter>
      <div className="App">
        <NabBar 
          language = {language}
          changeLanguageHandler = {changeLanguageHandler}
        />
        <Routes>
          <Route path='/groupList' element={<GroupList/>} />
          <Route path='/topicList' element={<TopicList/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

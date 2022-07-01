import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Home from './page/Home/Home'
import About from './page/About/About'
import { Routes, Route } from 'react-router-dom'
import Register from './page/Register/Register'
import ComicInfo from './page/ComicInfo/ComicInfo'
import  { ComicDetailProvider } from './store/ComicDetailReducer/context'
import EpsComic from './component/ComicInfo/EpsComic'
import NotFound from './page/NotFound/NotFound'
import Footer from './component/Footer/Footer'
import { Circle, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'
import SearchResult from './page/SearchResult/SearchResult'

const App = () => {

  const { toggleColorMode } = useColorMode()

  const bg = useColorModeValue("white", "black")


  return (
    <div>
      <Circle position = "fixed" right = "30px" bottom = "40px" bg = {bg}>
        <IconButton size = "lg" rounded={"40px"} onClick = {toggleColorMode} icon={<SunIcon />} />
      </Circle>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/about" element = {<About />}/>
        <Route path = "/register" element = { <Register /> } />
        <Route path = "*" element = {<NotFound />} />
        <Route path = "/comic/:id" element = { 
          <ComicDetailProvider>
            <ComicInfo />
          </ComicDetailProvider>
        }>
        </Route>
        <Route path = "/comic/:id/:eps" element = {
            <ComicDetailProvider>
              <EpsComic />
            </ComicDetailProvider>
          } />
          <Route path = "/search/result" element = { <SearchResult />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
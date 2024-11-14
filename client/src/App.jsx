import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from './authFolder/Login'
import Signup from './authFolder/Signup'
import Forgot from './authFolder/Forgot'
import Reset from './authFolder/Reset'
import Verify from './authFolder/verify'
import Home from './homeFolder/Home'

import NotVerified from './authFolder/NotVerified'
import HomeBlog from './blogFolder/homeBlog/homeBlog'
import CreateBlog from './blogFolder/createblog/CreateBlog'
import EditBlog from './blogFolder/editblog/EditBlog'
import ReadBlog from './blogFolder/readblog/ReadBlog'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/forgot-password' element={<Forgot/>}></Route>
      <Route path='/reset-password/:token' element={<Reset/>}></Route>
      <Route path='/verify/:token' element={<Verify/>}></Route>
      <Route path='/not-verified' element={<NotVerified/>}></Route>
      <Route path='/home' element={<HomeBlog/>}></Route>
      <Route path='/create-blog' element={<CreateBlog />} />
      <Route path='/edit-blog/:id' element={<EditBlog/>} />
      <Route path="/read-blog/:id" element={<ReadBlog />} />
    </Routes>
  )
}

export default App
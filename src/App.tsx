import React from 'react'
import List from './pages/manage/List'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router/index'
function App() {
  return (
    <>
      <h1 style={{ background: '#eee' }}>问卷FE</h1>
      <RouterProvider router={routerConfig}></RouterProvider>
    </>
  )
}

export default App

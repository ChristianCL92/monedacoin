import { RouterProvider } from 'react-router-dom'
import { Router } from './router'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <RouterProvider router={Router}/>
        <Outlet/>
      </div>
    </>
  )
}

export default App

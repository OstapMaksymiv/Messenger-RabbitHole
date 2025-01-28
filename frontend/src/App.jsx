import {  createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Lobby from './pages/lobby/Lobby'
import { useAuthContext } from './context/AuthContext'
import FirstLayout from './layouts/FirstLayout'
import SecondLayout from './layouts/SecondLayout'
import Faq from './pages/FAQ/Faq'

function App() {
  const {authUser} = useAuthContext()

  const router = createBrowserRouter([
    {
      path: "/",
        element: <SecondLayout/>,
        children:[
          {
            path: "/",
            element: <Lobby/>,
          },
          {
            path: "/faq",
            element: <Faq/>,
          },
        ]
    },
    {
      path: "/",
      element: <SecondLayout/>,
      children:[
        {
          path: "/home",
          element: authUser ? <Home/> : <Login/>,
        },
        {
          path: "/login",
          element:  <Login/>,
        },
        {
          path: "/signup",
          element: <SignUp/>,
        },
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
    )
  }
  
  export default App
  
 
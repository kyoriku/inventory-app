import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { redirect } from "react-router-dom";
import Auth from './utils/auth'

import App from './App.jsx'
import LoginPage from './pages/Login.jsx';
import Homepage from './pages/Home.jsx'
import FryerStation from './pages/Fryer.jsx'
import FryerStationMobile from './pages/FryerMobile.jsx'
import GrillStation from './pages/Grill.jsx'
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: '/home',
        element: <Homepage />,
        loader: async () => {
          const isLoggedIn = Auth.loggedIn();
          if (!isLoggedIn) {
            return redirect('/');
          }
          return null;
        }
      },
      {
        path: '/fryer',
        element: <FryerStation />,
        loader: async () => {
          const isLoggedIn = Auth.loggedIn();
          if (!isLoggedIn) {
            return redirect('/');
          }
          return null;
        }
      },
      {
        path: '/fryermobile',
        element: <FryerStationMobile />,
        loader: async () => {
          const isLoggedIn = Auth.loggedIn();
          if (!isLoggedIn) {
            return redirect('/');
          }
          return null;
        }
      },
      {
        path: '/grill',
        element: <GrillStation />,
        loader: async () => {
          const isLoggedIn = Auth.loggedIn();
          if (!isLoggedIn) {
            return redirect('/');
          }
          return null;
        }
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

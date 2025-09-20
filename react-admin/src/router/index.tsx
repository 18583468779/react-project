import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from '@/views/login/Login'
import { NotFound } from '@/views/404'
import { Welcome } from '@/views/Welcome'
import { Forbidden } from '@/views/403'
import Layout from '@/layout'

const routes = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      }
    ]
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/403',
    element: <Forbidden />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export const router = createBrowserRouter(routes)

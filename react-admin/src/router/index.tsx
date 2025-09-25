import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from '@/views/login/Login'
import { NotFound } from '@/views/404'
import { Forbidden } from '@/views/403'
import Layout from '@/layout'
import Welcome from '@/views/Welcome'
import { Dashboard } from '@/views/dashboard'
import UserList from '@/views/system/user'
import Department from '@/views/system/department'
import MenuList from '@/views/system/menu'

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
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/system/user',
        element: <UserList />
      },
      {
        path: '/system/department',
        element: <Department />
      },
      {
        path: '/system/menu',
        element: <MenuList />
      },

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

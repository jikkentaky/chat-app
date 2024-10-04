import { Navigate, Route, Routes } from 'react-router-dom'

import { Auth } from '@/pages/auth'
import { Chat } from '@/pages/chat'
import { Profile } from '@/pages/profile'
import { APP_ROUTE } from '@/types/enums/route'

const ROUTES = [
  {
    path: '*',
    element: <Navigate to={APP_ROUTE.AUTH} />,
  },
  {
    path: APP_ROUTE.AUTH,
    element: <Auth />,
  },
  {
    path: APP_ROUTE.PROFILE,
    element: <Profile />,
  },
  {
    path: `${APP_ROUTE.CHAT}`,
    element: <Chat />,
  },
]

const Layout = () => {
  return (
    <>
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  )
}

export { Layout }

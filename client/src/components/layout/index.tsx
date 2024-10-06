import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from '@/pages/auth';
import { Chat } from '@/pages/chat';
import { Profile } from '@/pages/profile';
import { APP_ROUTE } from '@/types/enums/route';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { USER_INFO_ROUTE } from '@/utils/config';
import { PrivateRoute } from '@/components/private-route';
import { PublicRoute } from '@/components/public-route';

const Layout = () => {
  const { userInfo, setUserInfo } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(USER_INFO_ROUTE, { withCredentials: true });

        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={APP_ROUTE.AUTH} />} />
        <Route path={APP_ROUTE.AUTH} element={
          <PublicRoute>
            <Auth />
          </PublicRoute>} />

        <Route path={APP_ROUTE.PROFILE} element={<PrivateRoute>
          <Profile />
        </PrivateRoute>} />

        <Route path={APP_ROUTE.CHAT} element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
      </Routes>
    </>
  );
};

export { Layout };

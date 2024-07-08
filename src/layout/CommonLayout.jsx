import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useIsAuth } from '../stores/useUserStore.js';

const CommonLayout = () => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth/sign-in');
    }
  }, [isAuth]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default CommonLayout;

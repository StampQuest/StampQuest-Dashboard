import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useIsAuth } from '../stores/useUserStore.js';

const AuthLayout = () => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/');

  }, [isAuth]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

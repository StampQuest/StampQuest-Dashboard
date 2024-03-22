import Sidebar from '../Components/Sidebar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../Components/Nav.jsx';
import { useIsAuth } from '../stores/useUserStore.js';
import { useEffect } from 'react';

const ContainerLayout = styled.div`
  padding: 0 0 0 270px;
`;

const PrivateLayout = () => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth/sign-in');
    }
  }, [isAuth]);

  return (
    <ContainerLayout>
      <Nav />
      <Sidebar />
      <Outlet />
    </ContainerLayout>
  );
};

export default PrivateLayout;

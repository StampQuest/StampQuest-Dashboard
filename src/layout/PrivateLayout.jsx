import Sidebar from '../Components/Sidebar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../Components/Nav.jsx';
import useStore, { useIsAuth } from '../stores/useUserStore.js';
import { useEffect } from 'react';

const ContainerLayout = styled.div`
  padding: 0 0 0 320px;
`;

const useFetchUser = () => useStore((state) => state.fetchUser);
const PrivateLayout = () => {
  const fetchUser = useFetchUser();
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth/sign-in');
    } else {
      fetchUser();
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

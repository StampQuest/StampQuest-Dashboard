import Sidebar from '../Components/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../Components/Nav.jsx';

const ContainerLayout = styled.div`
  padding: 0 0 0 320px;
`;
const PrivateLayout = () => {
  return (
    <ContainerLayout>
      <Nav />
      <Sidebar />
      <Outlet />
    </ContainerLayout>
  );
};

export default PrivateLayout;

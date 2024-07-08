import useStore from '../stores/useUserStore.js';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Input, Navbar, UncontrolledDropdown } from 'reactstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//styled div to make the avatar
const StyledAvatar = styled.div`
    width: 48px;
    height: 48px;
    border: 2px solid #fff;
    border-radius: 50%;
    background-size: cover;
    background-image: url(https://i.pravatar.cc);
`;

const useSignOut = () => useStore((state) => state.signOut);
const useGetUser = () => useStore((state) => state.user);
const Nav = () => {

  const signOut = useSignOut();
  const navigate = useNavigate();
  const user = useGetUser();

  return (
    <Navbar className="bg-success">
      <div className="text-white"> {user.company.name} - {user.lastname} {user.firstname}  </div>
      <Input type="search" placeholder="Rechercher une activité..." size="sm" className="w-25" />
      <Button color="primary" className="btn btn-primary" onClick={() => navigate('/')}>
        Retour à la page d'accueil
      </Button>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav>
          <StyledAvatar />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem disabled>
            <p className="font-semibold" style={{ color: '#3cc083' }}>
              {user.lastname} {user.firstname}
            </p>
            <p className="font-semibold" style={{ color: '#9b9b9b' }}>
              {user.email}
            </p>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-danger" onClick={signOut}>
            Déconnexion
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Navbar>
  );
};

export default Nav;

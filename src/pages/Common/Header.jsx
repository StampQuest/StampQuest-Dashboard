import React from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import useStore, { useIsAdmin } from '../../stores/useUserStore.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const StyledAvatar = styled.div`
    width: 48px;
    height: 48px;
    border: 2px solid #fff;
    border-radius: 50%;
    background-size: cover;
    background-image: url(https://i.pravatar.cc);
`;
const useGetUser = () => useStore((state) => state.user);
const useSignOut = () => useStore((state) => state.signOut);


const Header = () => {

  const isAdmin = useIsAdmin();
  const signOut = useSignOut();
  const user = useGetUser();
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      height: '100vh',
      backgroundSize: 'cover',
    }}>
      <div style={{ background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.53) 100%)', height: '100%' }}>
        <div className="container d-flex flex-column justify-content-between"
             style={{ height: '100vh', paddingTop: '2rem' }}>
          <div className="d-flex align-content-start justify-content-end">
            {isAdmin ?
              <Button color="primary" className="me-4" onClick={handleClick}>Acceder au tableau de bord</Button> : null}
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
          </div>
          <div className="d-flex flex-column align-items-start justify-content-center" style={{ flex: 1 }}>
            <h1 className="text-white mb-4">StampQuest</h1>
            <h4 className="text-white mb-4">
              Explorez votre monde avec stampQuest : découvrez, collectez, et partagez vos aventures !
            </h4>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Rechercher" />
              <span className="input-group-text">
          <Search />
        </span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Header;

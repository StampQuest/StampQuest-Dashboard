import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarContent,
} from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import useStore from '../stores/useUserStore.js';

const useSignOut = () => useStore((state) => state.signOut);
const Nav = () => {
  const signOut = useSignOut();

  return (
    <Navbar as="div" maxWidth="full" className="bg-default-100 shadow-md ">
      <NavbarContent as="div">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-400 bg-white dark:bg-default-500/20 data-[hover=true]:bg-white group-data-[focus=true]:bg-white ',
          }}
          placeholder="Rechercher une activité..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="md"
              src="https://i.pravatar.cc"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={['profile']}>
            <DropdownItem isReadOnly key="profile" className="h-14 gap-2 opacity-100" showDivider>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback" showDivider>
              Help & Feedback
            </DropdownItem>
            <DropdownItem key="logout" color="danger" className="text-danger" onClick={signOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;

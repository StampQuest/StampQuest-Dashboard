import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/sidebar.scss';
import { Book, Home, Ticket } from 'lucide-react';
import styled from 'styled-components';

const sidebarNavItems = [
  {
    display: 'Accueil',
    icon: <Home />,
    to: '/admin/dashboard',
  },
  {
    display: 'Activités',
    icon: <Ticket />,
    to: '/admin/dashboard/activity',
  },
  {
    display: 'Categories',
    icon: <Book />,
    to: '/admin/dashboard/categories',
  },
];

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
`;

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    const curPath = pathname;
    const activeItem = sidebarNavItems.findIndex((item) => item.to === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [pathname]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">StampQuest</div>
      <Divider />
      <div ref={sidebarRef} className="sidebar__menu" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator "
          style={{
            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px )`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
      <Divider className=" w-[80%] bg-default-100" as="div" style={{ margin: '0 auto' }} />
    </div>
  );
};

export default Sidebar;

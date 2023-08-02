import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Logo from '../../../assets/logo.svg';
import Navlinks from './Navlinks';
import classes from './Nav.module.css';
import { AuthContext } from '../../../context/auth-context';

const Nav = () => {
  const { token, userId } = useContext(AuthContext);
  const location = useLocation();
  const navigationLink = [
    { id: '00', name: 'HOME', href: '/' },
    { id: '01', name: 'DESTINATION', href: '/destination' },
    { id: '02', name: 'CREW', href: '/crew' },
    { id: '03', name: 'TECHNOLOGY', href: '/technology' },
    {
      id: '04',
      name: 'MY ACCOUNT',
      href: token ? `/user/${userId}` : '/login',
    },
  ];

  const isPageFound = (path: string) => {
    return location.pathname === path;
  };

  const showNavigation = navigationLink.some((page) => isPageFound(page.href));

  return (
    <>
      {showNavigation && (
        <nav className={classes.nav}>
          <img src={Logo} alt="App logo" />

          <Navlinks />
        </nav>
      )}
    </>
  );
};

export default Nav;

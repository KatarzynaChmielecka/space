import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';

import classes from './Navlinks.module.css';
import { AuthContext } from '../../../context/auth-context';

const Navlinks = () => {
  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const auth = useContext(AuthContext);

  const navigationLink = [
    { id: '00', name: 'HOME', href: '/' },
    { id: '01', name: 'DESTINATION', href: '/destination' },
    { id: '02', name: 'CREW', href: '/crew' },
    { id: '03', name: 'TECHNOLOGY', href: '/technology' },
    {
      id: '04',
      name: 'MY ACCOUNT',
      href: auth.token ? `/user/${auth.userId}` : '/login',
    },
  ];

  return (
    <>
      <div className={classes['navlinks-wrapper']}>
        <hr className={classes.hr} />

        {navigationLink.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            className={({ isActive }) =>
              isActive ? classes.active : classes.link
            }
          >
            <span>{item.id}</span> {item.name}
          </NavLink>
        ))}
      </div>

      {!open && (
        <button className={classes['menu-button']} aria-label="Open menu">
          <MenuIcon
            onClick={() => setOpen(true)}
            role="button"
            className={classes.icon}
          />
        </button>
      )}

      {open && (
        <>
          <div
            className={classes['navlinks-wrapper-mobile']}
            aria-label="Close menu"
          >
            <CloseIcon
              onClick={() => setOpen(false)}
              role="button"
              className={`${classes.icon} ${classes['icon--close']}`}
              sx={{ fontSize: '2.5rem' }}
            />

            {navigationLink.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? `${classes['active-mobile']}` : classes.link
                }
                onClick={closeMenu}
              >
                <span>{item.id}</span> {item.name}
              </NavLink>
            ))}
          </div>
          <div
            className={classes.backdrop}
            onClick={closeMenu}
            onKeyPress={openMenu}
            role="button"
            tabIndex={0}
          />
        </>
      )}
    </>
  );
};

export default Navlinks;

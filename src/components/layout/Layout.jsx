import { Outlet, useLocation } from 'react-router-dom';

import Nav from './nav/Nav';
import classes from './Layout.module.css';

const Layout = () => {
  const path = useLocation().pathname;

  let picture;

  if (path === '/') {
    picture = '../../assets/home/background-home-desktop.jpg';
  } else if (path === '/destination') {
    picture = '../../assets/destination/background-destination-desktop.jpg';
  } else if (path === '/crew') {
    picture = '../../assets/crew/background-crew-desktop.jpg';
  } else if (path === '/technology') {
    picture = '../../assets/technology/background-technology-desktop.jpg';
  }

  return (
    <>
      <Nav />

      <main
        className={classes.layout}
        style={{
          backgroundImage: `url(${picture})`,
          backgroundSize: 'cover',
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

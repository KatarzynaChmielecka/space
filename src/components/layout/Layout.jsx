import { Outlet, useLocation } from 'react-router-dom';

import CrewD from '../../assets/crew/background-crew-desktop.jpg';
import DestinationD from '../../assets/destination/background-destination-desktop.jpg';
import HomeD from '../../assets/home/background-home-desktop.jpg';
import Nav from './nav/Nav';
import TechnologyD from '../../assets/technology/background-technology-desktop.jpg';
import classes from './Layout.module.css';

const Layout = () => {
  const path = useLocation().pathname;

  let picture;

  if (path === '/') {
    picture = HomeD;
  } else if (path === '/destination') {
    picture = DestinationD;
  } else if (path === '/crew') {
    picture = CrewD;
  } else if (path === '/technology') {
    picture = TechnologyD;
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

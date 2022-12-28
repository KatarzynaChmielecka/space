import { Outlet, useLocation } from 'react-router-dom';

import Nav from './nav/Nav';
import classes from './Layout.module.css';

const Layout = () => {
  const path = useLocation().pathname;
  let background;

  switch (true) {
    case path === '/':
      background = `${classes.home}`;
      break;
    case path === '/destination':
      background = `${classes.destination}`;
      break;
    case path === '/crew':
      background = `${classes.crew}`;
      break;
    case path === '/technology':
      background = `${classes.technology}`;
      break;
    case path === '/register':
      background = `${classes.register}`;
      break;
  }

  return (
    <>
      <Nav />

      <main
        className={`${classes.layout} ${background} ${classes['background-size']}`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

import { Outlet, useLocation, useParams } from 'react-router-dom';

import Nav from './nav/Nav';
import classes from './Layout.module.css';

const Layout = () => {
  const path = useLocation().pathname;
  const paramsId = useParams().userId;
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
      background = `${classes['register-login']}`;
      break;
    case path === '/login':
      background = `${classes['register-login']}`;
      break;
    case path === `/user/${paramsId}`:
      background = `${classes.user}`;
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

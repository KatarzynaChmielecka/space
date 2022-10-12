import { Outlet } from 'react-router-dom';

import Nav from './nav/Nav';
import classes from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Nav />
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <main
          className={classes.layout}
          // style={{width:'100%', maxWidth:'1440px', display:'flex', justifyContent:'flex-end', paddingTop:'215px',  backgroundImage:'url("../src/assets/home/background-home-mobile.jpg")',
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat"}}
          style={{ width: '100%', maxWidth: '1440px' }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;

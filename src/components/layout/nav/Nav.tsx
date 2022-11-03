import Logo from '../../../assets/shared/logo.svg';
import Navlinks from './Navlinks';
import classes from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <img src={Logo} alt="App logo" />

      <Navlinks />
    </nav>
  );
};

export default Nav;

import Logo from '../../../assets/shared/logo.svg';
import Navlinks from './Navlinks';

const Nav = () => {
  return (
    <nav>
      <img src={Logo} alt="" />

      <Navlinks />
    </nav>
  );
};

export default Nav;

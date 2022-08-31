import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/crew">Crew</NavLink>
      <NavLink to="/destination">Destination</NavLink>
      <NavLink to="/technology">Technology</NavLink>
    </nav>
  );
};

export default Nav;

import Tabs from '../components/tabs/Tabs';
import classes from './UserPage.module.css';

const UserPage = () => {
  return (
    <div className={classes['user-page-wrapper']}>
      {/* {/* {!auth.token && <Link to="/login">Login</Link>} */}

      <h6 className={classes['user-page-wrapper__title']}>
        <span>04</span> MY ACCOUNT
      </h6>
      <Tabs />
    </div>
  );
};

export default UserPage;

import { useContext } from 'react';

import Modal from '../components/Modal';
import Tabs from '../components/tabs/Tabs';
import classes from './UserPage.module.css';
import { AuthContext } from '../context/auth-context';

const UserPage = () => {
  const { token } = useContext(AuthContext);
  return (
    <div className={classes['user-page-wrapper']}>
      {token && (
        <>
          <h6 className={classes['user-page-wrapper__title']}>
            <span>04</span> MY ACCOUNT
          </h6>
          <Tabs />
        </>
      )}
      {!token && (
        <Modal
          title="Something went wrong"
          content={"You aren't allowed to be here. Please log in again."}
          modalOnClick={false}
          showModal={true}
        />
      )}
    </div>
  );
};

export default UserPage;

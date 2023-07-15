import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modal';
import UserData from './UserData';
import UserImages from './UserImages';
import classes from './Tabs.module.css';
import { AuthContext } from '../../context/auth-context';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my data');
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const handleLogout = async () => {
    const response = await toast.promise(
      axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/logout`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            logout();
            navigate(`/`);
            return <p>{response.data.message} </p>;
          },
        },
        error: {
          render({
            data,
          }: ToastContentProps<{
            response: { status: number; data: { message: string } };
            status: number;
          }>) {
            if (data && data.response && data?.response.status === 0) {
              return (
                <p>
                  Sorry, we have problem with database connection. Please try
                  again later.
                </p>
              );
            }
            if (data && data.response && data.response.data) {
              return <p>{data.response.data.message} </p>;
            }
            return <p>Something went wrong, please try again later.</p>;
          },
        },
      },
      { position: 'top-center' },
    );
  };

  return (
    <div className={classes.tabs}>
      <div className={classes['tabs-nav']}>
        <button
          className={`${classes['tabs-nav-item']} ${
            activeTab === 'my data' ? classes.active : ''
          }`}
          onClick={() => handleTabClick('my data')}
        >
          <span>00</span> MY DATA
        </button>

        <button
          className={`${classes['tabs-nav-item']} ${
            activeTab === 'photos' ? classes.active : ''
          }`}
          onClick={() => handleTabClick('photos')}
        >
          <span>01</span> PHOTOS
        </button>

        <button
          className={`${classes['tabs-nav-item']} ${
            activeTab === 'notes' ? classes.active : ''
          }`}
          onClick={() => handleTabClick('notes')}
        >
          <span>02</span>
          NOTES
        </button>

        <button onClick={handleLogout}>
          {' '}
          <span>03</span>LOG OUT
        </button>
      </div>

      <hr />

      {token && (
        <div className={classes['tabs-content']}>
          {activeTab === 'my data' && <UserData />}

          {activeTab === 'photos' && <UserImages />}

          {activeTab === 'notes' && (
            <div>
              <h2>Notes</h2>

              <ul>
                <li>Note 1</li>
                <li>Note 2</li>
                <li>Note 3</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {!token && (
        <Modal
          title="Something went wrong"
          content={"You aren't allowed to be here. Please log in againaaa."}
          modalOnClick={false}
          showModal={true}
        />
      )}
    </div>
  );
};

export default Tabs;

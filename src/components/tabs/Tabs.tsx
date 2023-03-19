import React, { useState } from 'react';

import UserData from './UserData';
import classes from './Tabs.module.css';
import UserImages from './UserImages';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my data');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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

        <button>
          {' '}
          <span>03</span>LOG OUT
        </button>
      </div>

      <hr />

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
    </div>
  );
};

export default Tabs;

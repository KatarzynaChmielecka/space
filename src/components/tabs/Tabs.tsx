// // import { ReactNode, useState } from 'react';

// // const Tabs = ({ children }: { children: ReactNode }) => {
// //   const [activeTab, setActiveTab] = useState('userpage');

// //   const handleTabClick = (tab: string) => {
// //     setActiveTab(tab);
// //   };

// //   return (
// //     <div className="tabs">
// //       <div className="tabs-nav">
// //         <button
// //           className={`tabs-nav-item ${
// //             activeTab === 'userpage' ? 'active' : ''
// //           }`}
// //           onClick={() => handleTabClick('userpage')}
// //         >
// //           User Page
// //         </button>
// //         <button
// //           className={`tabs-nav-item ${activeTab === 'photos' ? 'active' : ''}`}
// //           onClick={() => handleTabClick('photos')}
// //         >
// //           Photos
// //         </button>
// //         <button
// //           className={`tabs-nav-item ${activeTab === 'notes' ? 'active' : ''}`}
// //           onClick={() => handleTabClick('notes')}
// //         >
// //           Notes
// //         </button>
// //       </div>
// //       <div className="tabs-content">
// //         {activeTab === 'MY DATA' && <div>User Page Content</div>}
// //         {activeTab === 'PHOTOS' && <div>Photos Content</div>}
// //         {activeTab === 'NOTES' && <div>Notes Content</div>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Tabs;

// import React, { useState } from 'react';

// const Tabs: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('userpage');

//   const handleTabClick = (tab: string) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="tabs">
//       <div className="tabs-nav">
//         <button
//           className={`tabs-nav-item ${activeTab === 'userpage' ? 'active' : ''}`}
//           onClick={() => handleTabClick('userpage')}
//         >
//           MY ACCOUNT
//         </button>
//         <button
//           className={`tabs-nav-item ${activeTab === 'photos' ? 'active' : ''}`}
//           onClick={() => handleTabClick('photos')}
//         >
//           PHOTOS
//         </button>
//         <button
//           className={`tabs-nav-item ${activeTab === 'notes' ? 'active' : ''}`}
//           onClick={() => handleTabClick('notes')}
//         >
//           NOTES
//         </button>
//       </div>
//       <div className="tabs-content">
//         {activeTab === 'userpage' && (
//           <div>
//             <h2>User Page</h2>
//             <p>Welcome to your user page!</p>
//           </div>
//         )}
//         {activeTab === 'photos' && (
//           <div>
//             <h2>Photos</h2>
//             <p>Here are some of your photos:</p>
//             <ul>
//               <li>Photo 1</li>
//               <li>Photo 2</li>
//               <li>Photo 3</li>
//             </ul>
//           </div>
//         )}
//         {activeTab === 'notes' && (
//           <div>
//             <h2>Notes</h2>
//             <p>Here are some of your notes:</p>
//             <ul>
//               <li>Note 1</li>
//               <li>Note 2</li>
//               <li>Note 3</li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tabs;

import React, { useState } from 'react';

import UserData from './UserData';
import styles from './Tabs.module.css';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my data');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabsNav}>
        <button
          className={`${styles.tabsNavItem} ${
            activeTab === 'my data' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('my data')}
        >
          MY DATA
        </button>
        <button
          className={`${styles.tabsNavItem} ${
            activeTab === 'photos' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('photos')}
        >
          Photos
        </button>
        <button
          className={`${styles.tabsNavItem} ${
            activeTab === 'notes' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('notes')}
        >
          Notes
        </button>
        <button>LOG OUT</button>
      </div>
      <div className={styles.tabsContent}>
        {activeTab === 'my data' && <UserData />}
        {activeTab === 'photos' && (
          <div>
            <h2>Photos</h2>
            <p>Here are some of your photos:</p>
            <ul>
              <li>Photo 1</li>
              <li>Photo 2</li>
              <li>Photo 3</li>
            </ul>
          </div>
        )}
        {activeTab === 'notes' && (
          <div>
            <h2>Notes</h2>
            <p>Here are some of your notes:</p>
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

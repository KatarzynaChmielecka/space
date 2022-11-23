import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';

import DestinationTab from '../components/DestinationTab';
import classes from './DestinationPage.module.css';
import data from '../data.json';

const Destination = () => {
  return (
    <div className={classes['destination-page-wrapper']}>
      <h1 className={classes['destination-page-wrapper__title']}>
        <span>01</span> PICK YOUR DESTINATION
      </h1>
      <TabsUnstyled defaultValue={0}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginRight: '320px',
          }}
        >
          <TabsListUnstyled
            className={classes['destination-page-wrapper__menu']}
          >
            {data.destinations.map((index, element) => (
              <TabUnstyled
                key={index.name}
                className={classes['destination-page-wrapper__tab']}
                onClick={() => console.log(element)}
              >
                {index.name}
              </TabUnstyled>
            ))}
          </TabsListUnstyled>
        </div>
        {/* content of tabs */}

        {data.destinations.map((index, item) => (
          <TabPanelUnstyled
            key={index.name}
            value={item}
            // style={{ display: 'flex'}}
            className={classes['destination-page-tab-panel']}
          >
            <DestinationTab
              src={index.images.webp}
              alt={index.name}
              name={index.name}
              description={index.description}
              distance={index.distance}
              travel={index.travel}
            />
          </TabPanelUnstyled>
        ))}
      </TabsUnstyled>
    </div>
  );
};

export default Destination;

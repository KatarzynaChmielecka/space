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
            <TabUnstyled className={classes['destination-page-wrapper__tab']}>
              {data.destinations[0].name}
            </TabUnstyled>
            <TabUnstyled className={classes['destination-page-wrapper__tab']}>
              {data.destinations[1].name}
            </TabUnstyled>
            <TabUnstyled className={classes['destination-page-wrapper__tab']}>
              {data.destinations[2].name}
            </TabUnstyled>
            <TabUnstyled className={classes['destination-page-wrapper__tab']}>
              {data.destinations[3].name}
            </TabUnstyled>
          </TabsListUnstyled>
        </div>
        {/* content of tabs */}

        {/* {data &&
          data.destinations.map((index) => (
            <TabPanelUnstyled
              key={index.name}
              value={index.name ? index.name : ''}
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
          ))} */}

        <TabPanelUnstyled value={0} style={{  display: 'flex' }}>
          <DestinationTab
            src={data.destinations[0].images.webp}
            alt={data.destinations[0].name}
            name={data.destinations[0].name}
            description={data.destinations[0].description}
            distance={data.destinations[0].distance}
            travel={data.destinations[0].travel}
          />
        </TabPanelUnstyled>

        <TabPanelUnstyled value={1} style={{  display: 'flex' }}>
          <DestinationTab
            src={data.destinations[1].images.webp}
            alt={data.destinations[1].name}
            name={data.destinations[1].name}
            description={data.destinations[1].description}
            distance={data.destinations[1].distance}
            travel={data.destinations[1].travel}
          />
        </TabPanelUnstyled>

        <TabPanelUnstyled value={2} style={{  display: 'flex' }}>
          <DestinationTab
            src={data.destinations[2].images.webp}
            alt={data.destinations[2].name}
            name={data.destinations[2].name}
            description={data.destinations[2].description}
            distance={data.destinations[2].distance}
            travel={data.destinations[2].travel}
          />
        </TabPanelUnstyled>

        <TabPanelUnstyled value={3} style={{ color: 'red', display: 'flex' }}>
          <DestinationTab
            src={data.destinations[3].images.webp}
            alt={data.destinations[3].name}
            name={data.destinations[3].name}
            description={data.destinations[3].description}
            distance={data.destinations[3].distance}
            travel={data.destinations[3].travel}
          />
        </TabPanelUnstyled>
      </TabsUnstyled>
    </div>
  );
};

export default Destination;

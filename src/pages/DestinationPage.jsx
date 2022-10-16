import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';

import DestinationTab from '../components/DestinationTab';
import data from '../data.json';

// import classes from './DestinationPage.module.css';

const Destination = () => {
  return (
    <div style={{ width: '100%', background: 'grey' }}>
      <TabsUnstyled defaultValue={0} style={{ margin: '200px 0 0 0' }}>
        <TabsListUnstyled style={{ textAlign: 'right' }}>
          <TabUnstyled>{data.destinations[0].name}</TabUnstyled>
          <TabUnstyled>{data.destinations[1].name}</TabUnstyled>
          <TabUnstyled>{data.destinations[2].name}</TabUnstyled>
          <TabUnstyled>{data.destinations[3].name}</TabUnstyled>
        </TabsListUnstyled>

        {/* content of tabs */}
        <TabPanelUnstyled value={0} style={{ color: 'red', display: 'flex' }}>
          <DestinationTab
            src={data.destinations[0].images.webp}
            alt={data.destinations[0].name}
            name={data.destinations[0].name}
            description={data.destinations[0].description}
            distance={data.destinations[0].distance}
            travel={data.destinations[0].travel}
          />
        </TabPanelUnstyled>

        <TabPanelUnstyled value={1} style={{ color: 'red', display: 'flex' }}>
          <DestinationTab
            src={data.destinations[1].images.webp}
            alt={data.destinations[1].name}
            name={data.destinations[1].name}
            description={data.destinations[1].description}
            distance={data.destinations[1].distance}
            travel={data.destinations[1].travel}
          />
        </TabPanelUnstyled>

        <TabPanelUnstyled value={2} style={{ color: 'red', display: 'flex' }}>
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

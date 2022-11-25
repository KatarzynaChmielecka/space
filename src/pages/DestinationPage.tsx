import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { SetStateAction, useState } from 'react';

import DestinationTab from '../components/DestinationTab';
import classes from './DestinationPage.module.css';
import data from '../data.json';
import { PlanetInterface } from '../types/interfaces';

const Destination = () => {
  const [planet, setPlanet] = useState(data.destinations[0].name);
  const [number, setNumber] = useState(0);
  const handlePlanet = (el: PlanetInterface, index: SetStateAction<number>) => {
    setPlanet(el.name);
    setNumber(index);
  };

  const filteredPlanet = data.destinations.filter((el) => el.name === planet);
  return (
    <div className={classes['destination-page-wrapper']}>
      <h1 className={classes['destination-page-wrapper__title']}>
        <span>01</span> PICK YOUR DESTINATION
      </h1>
      <TabsUnstyled defaultValue={0} selectionFollowsFocus>
        <div className={classes['destination-page__menu']}>
          <TabsListUnstyled
            className={classes['destination-page-wrapper__menu']}
          >
            {data.destinations.map((index, item) => (
              <TabUnstyled
                key={index.name}
                className={
                  index.name === planet
                    ? `${classes.active} ${classes['destination-page-wrapper__tab']}`
                    : classes['destination-page-wrapper__tab']
                }
                onClick={() => handlePlanet(index, item)}
                onChange={() => handlePlanet(index, item)}
              >
                {index.name}
              </TabUnstyled>
            ))}
          </TabsListUnstyled>
        </div>
        {/* content of tabs */}

        {filteredPlanet &&
          filteredPlanet.map((index) => (
            <TabPanelUnstyled
              key={index.name}
              value={number}
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

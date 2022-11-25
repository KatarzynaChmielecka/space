import classes from './DestinationTab.module.css';
import { AltInterface } from '../types/interfaces';

const DestinationTab = ({
  src,
  alt,
  name,
  description,
  distance,
  travel,
}: AltInterface) => {
  return (
    <>
      <img src={src} alt={alt} className={classes['planet-image']} />
      <div className={classes['destination-tab-content']}>
        <h1 className={classes['destination-tab-content__planet']}>{name}</h1>
        <p className={classes['destination-tab-content__description']}>
          {description}
        </p>
        <hr />
        <div className={classes['destination-tab-content__fun-fact']}>
          <div className={classes['destination-tab-content__fun-fact-center']}>
            <p className={classes['destination-tab-content__fun-fact-title']}>
              AVG. DISTANCE
            </p>
            <p className={classes['destination-tab-content__fun-fact-value']}>
              {distance}
            </p>
          </div>
          <div className={classes['destination-tab-content__fun-fact-center']}>
            <p className={classes['destination-tab-content__fun-fact-title']}>
              EST. TRAVEL TIME
            </p>
            <p className={classes['destination-tab-content__fun-fact-value']}>
              {travel}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationTab;

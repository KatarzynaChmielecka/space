import Carousel from '@itseasy21/react-elastic-carousel';

import classes from './CrewPage.module.css';
import data from '../data.json';

const Crew = () => {
  return (
    <div className={`${classes['crew-page-wrapper']} ${'crew-page-wrapper'}`}>
      <h6 className={classes['crew-page-wrapper__title']}>
        <span>02</span> MEET YOUR CREW
      </h6>
      <Carousel
        showArrows={false}
        className={classes['crew-page-carousel']}
        isRTL={false}
      >
        {data.crew.map((index) => (
          <div key={index.name} className={classes['crew-page-carousel__item']}>
            <div className={classes['crew-page-carousel__item-content']}>
              <p className={classes['crew-page-carousel__role']}>
                {index.role}
              </p>
              <p className={classes['crew-page-carousel__name']}>
                {index.name}
              </p>
              <p className={classes['crew-page-carousel__bio']}>{index.bio}</p>
            </div>
            <div className={classes['crew-page-carousel__image-wrapper']}>
              <img
                src={index.images.webp}
                alt={index.name}
                className={classes['crew-page-carousel__image']}
                draggable="false"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Crew;

import Carousel from '@itseasy21/react-elastic-carousel';
import { useEffect, useState } from 'react';

import TechnologyCarouselContent from '../components/TechnologyCarouselContent';
import TechnologyPagination from '../components/TechnologyPagination';
import classes from './TechnologyPage.module.css';
import data from '../data.json';

const Technology = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const mediaQuery = () => {
    setViewportWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', mediaQuery);
  }, []);

  return (
    <div
      className={`${
        classes['technology-page-wrapper']
      } ${'technology-page-wrapper'}`}
    >
      <h6 className={classes['technology-page-wrapper__title']}>
        <span>03</span> SPACE LAUNCH 101
      </h6>

      <Carousel
        verticalMode={viewportWidth > 1440}
        showArrows={false}
        className={classes['technology-page-carousel']}
        isRTL={false}
        renderPagination={({ pages, activePage, onClick }) => {
          return (
            <div className={classes['technology-page-carousel__pagination']}>
              {pages.map((page) => {
                return (
                  <TechnologyPagination
                    key={page}
                    page={page}
                    isActivePage={activePage === page}
                    onClick={onClick}
                  />
                );
              })}
            </div>
          );
        }}
      >
        {data.technology.map((index) => (
          <TechnologyCarouselContent
            key={index.name}
            name={index.name}
            description={index.description}
            src={
              viewportWidth <= 1440
                ? index.images.landscape
                : index.images.portrait
            }
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Technology;

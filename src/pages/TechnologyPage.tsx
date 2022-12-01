import Carousel from '@itseasy21/react-elastic-carousel';

import classes from './TechnologyPage.module.css';
import data from '../data.json';

const Technology = () => {
  return (
    <div
      className={`${
        classes['technology-page-wrapper']
      } ${'technology-page-wrapper'}`}
      style={{ width: '100%', height: '100%', padding: '80px 0px 0 110px' }}
    >
      <h6
        className={classes['technology-page-wrapper__title']}
        style={{ marginBottom: '25px' }}
      >
        <span>02</span> MEET YOUR technology
      </h6>
      <Carousel
        verticalMode
        showArrows={false}
        className={classes['technology-page-carousel']}
        isRTL={false}
        renderPagination={({ pages, activePage, onClick }) => {
          return (
            <div
              style={{
                border: '1px solid green',
                position: 'absolute',
                left: 0,
                top: 'calc(50% - 50%/2.75)',
                display: 'flex',
                gap: '20px',
                flexDirection: 'column',
              }}
            >
              {pages.map((page) => {
                const isActivePage = activePage === page;
                return (
                  <div
                    key={page}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      onClick(page.toString());
                    }}
                    onKeyPress={() => {
                      onClick(page.toString());
                    }}
                    className={isActivePage ? classes.active : classes.inactive}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {page + 1}
                  </div>
                );
              })}
            </div>
          );
        }}
      >
        {data.technology.map((index) => (
          <div
            key={index.name}
            className={classes['technology-page-carousel__item']}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              className={classes['technology-page-carousel__item-content']}
              style={{
                width: '400px',
                marginLeft: '70px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <p className={classes['technology-page-carousel__terminology']}>
                The therminology
              </p>
              <p className={classes['technology-page-carousel__name']}>
                {index.name}
              </p>
              <p className={classes['technology-page-carousel__description']}>
                {index.description}
              </p>
            </div>
            <div className={classes['technology-page-carousel__image-wrapper']}>
              <img
                src={index.images.portrait}
                alt={index.name}
                className={classes['technology-page-carousel__image']}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Technology;

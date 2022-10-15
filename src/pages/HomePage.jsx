import { Link } from 'react-router-dom';

import classes from './HomePage.module.css';

const Home = () => {
  return (
    <>
      <div className={classes['home-page-wrapper']}>
        <div className={classes['home-page-wrapper__content-left']}>
          <p className={classes['home-page-wrapper__text1']}>
            SO, YOU WANT TO TRAVEL TO
          </p>
          <h1 className={classes['home-page-wrapper__text2']}>SPACE</h1>
          <p className={classes['home-page-wrapper__text3']}>
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>
        <Link
          to="/destination"
          className={classes['home-page-wrapper__content-right']}
        >
          <p className={classes['home-page-wrapper__explore']}>EXPLORE</p>
        </Link>
      </div>
    </>
  );
};

export default Home;

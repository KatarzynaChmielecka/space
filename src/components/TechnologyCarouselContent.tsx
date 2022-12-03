import classes from './TechnologyCarouselContent.module.css';

const TechnologyCarouselContent = ({
  name,
  description,
  src,
}: {
  name: string;
  description: string;
  src: string;
}) => {
  return (
    <div className={classes['technology-page-carousel__item']}>
      <div className={classes['technology-page-carousel__item-content']}>
        <p className={classes['technology-page-carousel__terminology']}>
          THE TERMINOLOGY...
        </p>
        <p className={classes['technology-page-carousel__name']}>{name}</p>
        <p className={classes['technology-page-carousel__description']}>
          {description}
        </p>
      </div>
      <div className={classes['technology-page-carousel__image-wrapper']}>
        <img
          src={src}
          alt={name}
          className={classes['technology-page-carousel__image']}
        />
      </div>
    </div>
  );
};

export default TechnologyCarouselContent;

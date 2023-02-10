import classes from './UserCard.module.css';
import photo from '../assets/shared/photo.png';

const UserCard = ({
  src,
  username,
  userEmail,
  editImage,
  editData,
}: {
  src: string;
  username: string;
  userEmail: string;
  editImage: () => void;
  editData: () => void;
}) => {
  return (
    <div className={classes['user-card-wrapper']}>
      <div className={classes['user-card__images-wrapper']}>
        <img
          src={src}
          alt="user avatar"
          className={classes['user-card-wrapper__avatar']}
        />
        <div
          role="button"
          onClick={editImage}
          onKeyDown={editImage}
          tabIndex={0}
          className={classes['user-card-wrapper__photo']}
        >
          <img src={photo} alt="" className={classes.photo} />
        </div>
      </div>
      <div className={classes['user-card-wrapper__user-data']}>
        <p>{username}</p>
        <p>{userEmail}</p>
      </div>
      <button
        onClick={editData}
        className={classes['user-card-wrapper__submit-button']}
      >
        Edit data
      </button>
    </div>
  );
};

export default UserCard;

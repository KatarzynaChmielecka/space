import classes from './UserCard.module.css';
import photo from '../assets/shared/edit-image.png';
import photo2 from '../assets/shared/edit.png';
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
        <div className={classes['user-card-wrapper__user-data-part']}>
          <div>
            <h6 className={classes['user-card-wrapper__label']}>NAME:</h6>
            <p>{username}</p>
          </div>
          <div
            role="button"
            onClick={editImage}
            onKeyDown={editImage}
            tabIndex={0}
            // className={classes['user-card-wrapper__photo']}
          >
            <img src={photo2} alt="" />
          </div>
        </div>
        <div className={classes['user-card-wrapper__user-data-part']}>
          <div>
            <h6 className={classes['user-card-wrapper__label']}>EMAIL:</h6>
            <p>{userEmail}</p>
          </div>
          <div
            role="button"
            onClick={editImage}
            onKeyDown={editImage}
            tabIndex={0}
            // className={classes['user-card-wrapper__photo']}
          >
            <img src={photo2} alt="" />
          </div>
        </div>
        <div className={classes['user-card-wrapper__user-data-part']}>
          <div>
            <h6 className={classes['user-card-wrapper__label']}>PASSWORD:</h6>
            <p>*****</p>
          </div>
          <div
            role="button"
            onClick={editImage}
            onKeyDown={editImage}
            tabIndex={0}
            // className={classes['user-card-wrapper__photo']}
          >
            <img src={photo2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

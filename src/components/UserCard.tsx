import { ReactEventHandler } from 'react';

import classes from './UserCard.module.css';
import photo from '../assets/shared/edit-image.png';
import photo2 from '../assets/shared/edit.png';
import { errorImage } from '../utils/errorImage';

const UserCard = ({
  src,
  username,
  userEmail,
  editImage,
  editName,
  editEmail,
  editPassword,
}: {
  src: string;
  username: string;
  userEmail: string;
  editImage: () => void;
  editName: () => void;
  editEmail: () => void;
  editPassword: () => void;
}) => {
  return (
    <div className={classes['user-card-wrapper']}>
      <div className={classes['user-card__images-wrapper']}>
        <img
          src={src}
          onError={errorImage as ReactEventHandler<HTMLImageElement>}
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
            onClick={editName}
            onKeyDown={editName}
            tabIndex={0}
            className={classes['user-card-wrapper__photo-right']}
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
            onClick={editEmail}
            onKeyDown={editEmail}
            tabIndex={0}
            className={classes['user-card-wrapper__photo-right']}
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
            onClick={editPassword}
            onKeyDown={editPassword}
            tabIndex={0}
            className={classes['user-card-wrapper__photo-right']}
          >
            <img src={photo2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

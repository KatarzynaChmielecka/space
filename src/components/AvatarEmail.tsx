import { ReactEventHandler } from 'react';

import classes from './AvatarEmail.module.css';
import { errorImage } from '../utils/errorImage';

const AvatarEmail = ({ src, email }: { src: string; email: string }) => {
  return (
    <div className={classes['user-avatar-email']}>
      <img
        src={src}
        alt="User avatar"
        onError={errorImage as ReactEventHandler<HTMLImageElement>}
      />

      <p className={classes['user-avatar-email__user-data-mail']}>{email}</p>
    </div>
  );
};
export default AvatarEmail;

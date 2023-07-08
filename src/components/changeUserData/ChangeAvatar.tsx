import * as Yup from 'yup';
import { ChangeEvent, Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
import useChange from '../../hooks/useChange';
import { AuthContext } from '../../context/auth-context';

interface UserFormValues {
  avatar: string;
}
const UserFormSchema = (isEditing: boolean) =>
  Yup.object({
    avatar: Yup.mixed().test('avatar', 'Your avatar is required.', (value) => {
      if (isEditing && !value) {
        return false;
      }
      return true;
    }),
  });

const ChangeAvatar = ({
  isEditing,
  setIsEditing,
  fetchUserData,
  previewUrl,
  setPreviewUrl,
}: {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  fetchUserData: () => void;
  previewUrl: string | null;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
}) => {
  const { token } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema(isEditing)),
    mode: 'onSubmit',
    defaultValues: {
      avatar: '',
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const { onSubmit } = useChange(
    isEditing,
    setIsEditing,
    'image',
    fetchUserData,
    reset,
    true,
    setPreviewUrl,
  );
  const handleFormSubmit = (data: UserFormValues) => {
    onSubmit({ avatar: data.avatar[0] as string });
  };
  return (
    <>
      {isEditing && token && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={`${classes['form-wrapper__form']} ${classes['form-wrapper__form--user-page']}`}
          >
            <div className={classes['field-wrapper']}>
              <div
                className={`${classes['input-wrapper']} ${classes['avatar-wrapper']}`}
              >
                <div>
                  <label htmlFor="avatar" className={classes.label}>
                    Change avatar
                  </label>

                  <div className={classes['icons-wrapper']}>
                    <button className={classes['button-avatar']}>+</button>
                    <input
                      type="file"
                      {...register('avatar')}
                      onChange={(e) => {
                        handleImageChange(e);
                        register('avatar').onChange(e);
                      }}
                      name="avatar"
                      className={classes['custom-file-input']}
                      title=""
                    />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={classes['image-preview']}
                      />
                    )}
                    {!previewUrl && (
                      <div className={classes['preview-div']}>PREVIEW</div>
                    )}
                  </div>
                </div>
              </div>
              {errors.avatar ? (
                <p className={`${classes.error} ${classes['avatar-error']}`}>
                  {errors.avatar?.message as string}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className={classes['form-wrapper__form-link-button-wrapper']}>
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  setIsEditing(false);
                  reset();
                }}
                className={classes['form-wrapper__form-button-back']}
              >
                BACK
              </button>
              <button
                disabled={Object.keys(errors).length >= 1}
                type="submit"
                className={classes['form-wrapper__form-button-submit']}
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default ChangeAvatar;

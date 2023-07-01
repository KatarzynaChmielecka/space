import * as Yup from 'yup';
import axios from 'axios';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from '../../pages/Form.module.css';
import { AuthContext } from '../../context/auth-context';

interface UserFormValues {
  avatar: string;
}
const UserFormSchema = (isEditingAvatar: boolean) =>
  Yup.object({
    avatar: Yup.mixed().test('avatar', 'Your avatar is required.', (value) => {
      if (isEditingAvatar && !value) {
        return false;
      }
      return true;
    }),
  });

const ChangeAvatar = ({
  isEditingAvatar,
  setIsEditingAvatar,
}: {
  isEditingAvatar: boolean;
  setIsEditingAvatar: Dispatch<SetStateAction<boolean>>;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { token } = useContext(AuthContext);
  const paramsUserId = useParams().userId;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: yupResolver(UserFormSchema(isEditingAvatar)),
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
  const onSubmitAvatar = handleSubmit(async (data: UserFormValues) => {
    const formData = new FormData();
    formData.append('avatar', data.avatar[0]);
    const response = await toast.promise(
      axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            setPreviewUrl(null);
            setIsEditingAvatar(false);
            // fetchUserData();
            reset();
            return <p>{response.data.message} </p>;
          },
        },
        error: {
          render({
            data,
          }: ToastContentProps<{
            response: { status: number; data: { message: string } };
            status: number;
          }>) {
            setPreviewUrl(null);
            setIsEditingAvatar(false);
            reset();
            if (data && data.response && data?.response.status === 0) {
              return (
                <p>
                  Sorry, we have problem with database connection. Please try
                  again later.
                </p>
              );
            }
            if (data && data.response && data.response.data) {
              return <p>{data.response.data.message} </p>;
            }
            return <p>Something went wrong, please try again later.</p>;
          },
        },
      },
      { position: 'top-center' },
    );
  });
  return (
    <>
      {isEditingAvatar && token && (
        <div className={classes['form-wrapper']}>
          <form
            onSubmit={onSubmitAvatar}
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
                <p
                  className={`${classes.error} ${classes['avatar-error']}`}
                  style={{ textAlign: 'center' }}
                >
                  {errors.avatar?.message}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className={classes['form-wrapper__form-link-button-wrapper']}>
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  setIsEditingAvatar(false);
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

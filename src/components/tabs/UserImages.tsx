import * as Yup from 'yup';
import axios from 'axios';
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContentProps, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './UserImages.module.css';
import { AuthContext } from '../../context/auth-context';

interface ImagesFormValues {
  images: FileList[];
}

interface Image {
  _id: string;
  imageUrl: string;
}

interface UserData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    images: Image[];
  };
}
interface SubmitData {
  images: FileList[];
}

const ImagesFormSchema = Yup.object({
  images: Yup.mixed().test('images', 'Your images is required.', (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  }),
});

const UserImages = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const paramsUserId = useParams().userId;
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ImagesFormValues>({
    resolver: yupResolver(ImagesFormSchema),
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      const data = response.data;

      if (data) {
        setUserData(data);
      } else {
        setError("You aren't allowed to be here.Please, login.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError('Something went wrong. Please,try again later.');
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  console.log(userData);
  const onSubmit = handleSubmit(async (data: SubmitData) => {
    const formData = new FormData();
    Object.entries({
      images: data.images[0] as unknown as Blob,
    }).forEach(([key, value]) => {
      formData.set(key, value);
    });

    const response = await toast.promise(
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/${paramsUserId}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      ),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            setPreviewUrl(null);
            reset();
            fetchUserData();
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
    <div className={classes['user-images-wrapper']}>
      {auth.token && userData && (
        <>
          <div className={classes['user-images-wrapper__user-data']}>
            <img src={userData.user.avatar} alt="User avatar" />

            <p className={classes['user-images-wrapper__user-data-mail']}>
              {userData.user.email}
            </p>
          </div>
          <div className={classes['user-images-wrapper__images']}>
            <h6>YOUR PHOTOS</h6>
            <div className={classes['form-wrapper']}>
              <form
                onSubmit={onSubmit}
                className={classes['form-wrapper__form']}
              >
                <div className={classes['field-wrapper']}>
                  <div
                    className={`${classes['input-wrapper']} ${classes['avatar-wrapper']}`}
                  >
                    <div>
                      <label htmlFor="images" className={classes.label}>
                        Avatar
                      </label>

                      <div className={classes['icons-wrapper']}>
                        <button className={classes['button-avatar']}>+</button>
                        <input
                          type="file"
                          {...register('images')}
                          onChange={(e) => {
                            handleImageChange(e);
                            register('images').onChange(e);
                          }}
                          name="images"
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
                  {errors.images ? (
                    <p
                      className={`${classes.error} ${classes['avatar-error']}`}
                      style={{ textAlign: 'center' }}
                    >
                      {errors.images?.message}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div
                  className={classes['form-wrapper__form-link-button-wrapper']}
                >
                  <button
                    type="submit"
                    className={classes['form-wrapper__form-button-submit']}
                  >
                    ADD IMAGE
                  </button>
                </div>
              </form>
            </div>
          </div>
          {userData &&
            userData.user.images.map((index: Image) => (
              <img key={index._id} src={index.imageUrl} alt="" />
            ))}
        </>
      )}
      {!auth.token && (
        <div
        // className={classes2['user-page-logout']}
        >
          <p>{error || 'Please, login.'}</p>
          <Link
            to="/login"
            //   className={classes2['user-page-logout__link']}
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
export default UserImages;

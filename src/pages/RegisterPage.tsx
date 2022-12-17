import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';

import classes from './RegisterPage.module.css';

// import ImageUpload from '../components/ImageUpload';

// import { useFormikContext } from 'formik';

// import { useState } from 'react';

// interface RegisterFormValues {
//   username: string;
//   email: string;
//   password: string;
//   image: string | null
// }

const initialValues = {
  username: '',
  email: '',
  password: '',
  image: '',
};
const RegisterFormSchema = Yup.object({
  username: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  image: Yup.mixed().required('Requiredaaa'),
});
const RegisterPage: React.FC = () => {
  const [userData, setUserData] = useState(initialValues);

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];

    const reader = new FileReader();

    console.log(file);
    console.log(event.target.value);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    // values.image = event?.target.value;
    // console.log(Formik.children)
    reader.readAsDataURL(file);
    setUserData({ ...userData, image: event.target.value });
    console.log(userData);
  };
  // console.log(initialValues);
  return (
    <div
      className={classes['register-page-wrapper']}
      style={{ width: '100%', outline: '1px solid green' }}
    >
      <Formik
        initialValues={userData}
        validationSchema={RegisterFormSchema}
        onSubmit={() => {
          // const formData = new FormData();
          // formData.append('username', values.username);
          // formData.append('email', values.email);
          // formData.append('password', values.password);
          // formData.append('image', values.image);
          // values.image = event?.target.value;
          // console.log(formData);
          console.log(userData);
        }}
      >
        <Form>
          <label htmlFor="username">Name</label>
          <Field name="username" type="text" />
          <ErrorMessage name="username" />

          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          {/* <ImageUpload name="image" /> */}
          <input name="image" type="file" onChange={handleImageChange} />
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;

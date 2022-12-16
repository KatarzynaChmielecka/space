import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import ImageUpload from '../components/ImageUpload';
import classes from './RegisterPage.module.css';

// import { useState } from 'react';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  image: string;
}

const RegisterFormSchema = Yup.object({
  username: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  image: Yup.string().required('Requiredaaa'),
});
const RegisterPage: React.FC = () => {
  //   const [userData, setUserData] = useState();
  //   const handleSubmit = (values: { file: any }) => {
  //     if (values.file) {
  //       onFileUpload(values.file);
  //     }
  //   };
  return (
    <div
      className={classes['register-page-wrapper']}
      style={{ width: '100%', outline: '1px solid green' }}
    >
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          image: '',
        }}
        validationSchema={RegisterFormSchema}
        onSubmit={(values: RegisterFormValues) => {
          // submit form logic goes here
          console.log(values);
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

          <Field name="file" component={ImageUpload} />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;

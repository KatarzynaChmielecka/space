import { Field, useField } from 'formik';
import { useState } from 'react';

import classes from './ImageUpload.module.css';

// import Button from './Button';
// interface Props {
//   name: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// interface ImageUploadProps {
//   label: string;
//   name: string;
//   type: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

const ImageUpload = ({ name }: { name: string }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [field, meta, helpers] = useField(props);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    // onChange(event);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  return (
    // <div>
    //   <label>
    //     {label}
    //     <input {...field} {...props} onChange={handleFileChange}/>
    //   </label>
    //   {meta.touched && meta.error ? (
    //     <div className="error">{meta.error}</div>
    //   ) : null}

    //   {previewUrl && <img src={previewUrl} alt="Preview" />}
    // </div>
    <>
      <input
        // className="attribute_input"
        name={name}
        type="file"
        onChange={handleFileChange}
      />
      {previewUrl && <img src={previewUrl} alt="Preview" />}
    </>
  );
};

export default ImageUpload;

// Aby stworzyć formularz rejestracji użytkownika za pomocą Formik, React i TypeScript bez użycia zewnętrznej biblioteki do uploadu plików, należy wykonać następujące kroki:

// Zainstaluj potrzebne biblioteki:
// Copy code
// npm install formik yup
// Stwórz komponent formularza rejestracji. W tym celu możesz użyć Formik i yup do walidacji pól formularza.
// Copy code
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const RegisterForm = () => {
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
//   });

//   return (
//     <Formik
//       initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
//       validationSchema={validationSchema}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           console.log(values);
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <Field type="text" name="name" placeholder="Name" />
//           <ErrorMessage name="name" component="div" />
//           <Field type="email" name="email" placeholder="Email" />
//           <ErrorMessage name="email" component="div" />
//           <Field type="password" name="password" placeholder="Password" />
//           <ErrorMessage name="password" component="div" />
//           <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
//           <ErrorMessage name="confirmPassword" component="div" />
//           <button type="submit" disabled={isSubmitting}>
//             Register
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default RegisterForm;
// // Stwórz komponent do uploadu zdjęcia z podglądem. Możesz użyć input typu file do umożliwienia użytkownikowi wybrania zdjęcia z dysku.
// // Copy code
// // import React, { useState } from 'react';

// // const ImageUpload = () => {
// //   const [image, setImage] = useState(null);
// //   const [previewUrl, setPreviewUrl] = useState(null);

// // Katarzyna Chmielecka
// // dokończ
// // const handleChange = (event) => {
// // const file = event.target.files[0];
// // setImage(file);

// // Copy code
// // const reader = new FileReader();
// // reader.onloadend = () => {
// //   setPreviewUrl(reader.result);
// // };
// // reader.readAsDataURL(file);
// // };

// // return (
// // <div>
// // <input type="file" onChange={handleChange} />
// // {previewUrl && <img src={previewUrl} alt="Preview" />}
// // </div>
// // );
// // };

// // export default ImageUpload;

// // Copy code

// // 4. Dodaj komponent do formularza rejestracji.

// // import React from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import ImageUpload from './ImageUpload';

// // const RegisterForm = () => {
// // const validationSchema = Yup.object().shape({
// // name: Yup.string().required('Name is required'),
// // email: Yup.string().email('Invalid email').required('Email is required'),
// // password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
// // });

// // return (
// // <Formik
// // initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
// // validationSchema={validationSchema}
// // onSubmit={(values, { setSubmitting }) => {
// // setTimeout(() => {
// // console.log(values);
// // setSubmitting(false);
// // }, 400);
// // }}
// // >
// // {({ isSubmitting }) => (
// // <Form>
// // <Field type="text" name="name" placeholder="Name" />
// // <ErrorMessage name="name" component="div" />
// // <Field type="email" name="email" placeholder="Email" />
// // <ErrorMessage name="email" component="div" />
// // <Field type="password" name="password" placeholder="Password" />
// // <ErrorMessage name="password" component="div" />
// // <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
// // <ErrorMessage name="confirmPassword" component="div" />
// // <ImageUpload />
// // <button type="submit" disabled={isSubmitting}>
// // Register
// // </button>
// // </Form>
// // )}
// // </Formik>
// // );
// // };

// // export default RegisterForm;

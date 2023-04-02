// import axios from 'axios';
// import { ToastContentProps, toast } from 'react-toastify';
// import { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import { AuthContext } from '../context/auth-context';

// interface UseChangeProps<T> {
//   url: string;
//   paramsUserId: string;
//   auth: { token: string };
//   fetchUserData: () => void;
// }

// interface UseChangeReturn<T> {
//   isEditing: boolean;
//   setIsEditing: (value: boolean) => void;
//   onSubmitName: (data: T) => void;
// }
// export const useToast = <T extends {}>({ url }: UsePatchProps<T>) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm<T>({
//     resolver: yupResolver(UserFormSchema(isEditingAvatar)),
//     mode: 'onSubmit',
//     defaultValues: {
//       avatar: '',
//     },
//   });
//   const auth = useContext(AuthContext);
//   const onSubmitName = handleSubmit(async (data: T) => {
//     const response = await toast.promise(
//       axios.patch(url, data, {
//         headers: {
//           Authorization: `Bearer ${auth.token}`,
//         },
//       }),
//       {
//         pending: 'Please, wait.',
//         success: {
//           render() {
//             setIsEditingName(false);
//             fetchUserData();
//             reset();
//             return <p>{response.data.message} </p>;
//           },
//         },
//         error: {
//           render({
//             data,
//           }: ToastContentProps<{
//             response: { status: number; data: { message: string } };
//             status: number;
//           }>) {
//             reset();
//             if (data && data.response && data?.response.status === 0) {
//               return (
//                 <p>
//                   Sorry, we have problem with database connection. Please try
//                   again later.
//                 </p>
//               );
//             }
//             if (data && data.response && data.response.data) {
//               return <p>{data.response.data.message} </p>;
//             }
//             return <p>Something went wrong, please try again later.</p>;
//           },
//         },
//       },
//       { position: 'top-center' },
//     );
//   });
// };

import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup';
import axios from 'axios';
import { DeepPartial, useForm } from 'react-hook-form';
import { ToastContentProps, toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext } from '../context/auth-context';

interface UseChangeProps<T> {
  url: string;
  defaultValues: DeepPartial<T>;
  validationSchema: yup.SchemaOf<T>;
  fetchUserData: () => void;
}
type FormData = Record<string, Blob>;

export const useFormChange = <T extends object>({
  url,
  defaultValues,
  validationSchema,
  fetchUserData,
}: UseChangeProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues,
  });
  const onSubmitChange = handleSubmit(async (data: FormData) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const response = await toast.promise(
      axios.patch(url, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }),
      {
        pending: 'Please, wait.',
        success: {
          render() {
            isEditing ? setIsEditing(false) : null;
            fetchUserData();
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

  return {
    isEditing,
    setIsEditing,
    onSubmitChange,
    url,
    register,
    errors,
    setValue,
    reset,
  };
};

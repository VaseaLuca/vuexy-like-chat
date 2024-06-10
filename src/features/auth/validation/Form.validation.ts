import * as Yup from 'yup';
import { LoginType } from '../types/common.types';
import { emailRegExCheck } from '@/lib/constants';


export const yupLoginSchema = Yup.object<LoginType>({
  email: Yup.string().matches(emailRegExCheck, 'Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});
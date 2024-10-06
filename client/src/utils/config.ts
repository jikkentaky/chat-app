import * as yup from 'yup';

const HOST = import.meta.env.VITE_SERVER_URL;
const AUTH_ROUTES = 'api/auth';
const SIGN_UP_ROUTE = `${AUTH_ROUTES}/signup`;
const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
const USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;


const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
})

const signUpSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match'),
})

export {
  HOST,
  AUTH_ROUTES,
  SIGN_UP_ROUTE,
  USER_INFO_ROUTE,
  loginSchema,
  signUpSchema,
  LOGIN_ROUTE,
}

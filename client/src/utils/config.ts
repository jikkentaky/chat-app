import * as yup from 'yup';
import animationData from '@/assets/lottie-json.json';

const HOST = import.meta.env.VITE_SERVER_URL;

// Auth routes
const AUTH_ROUTES = 'api/auth';
const SIGN_UP_ROUTE = `${AUTH_ROUTES}/signup`;
const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
const USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;
const UPDATE_USER_INFO_ROUTE = `${AUTH_ROUTES}/update-user-info`;
const LOG_OUT_ROUTE = `${AUTH_ROUTES}/logout`;

// Contact routes
const CONTACT_ROUTES = 'api/contact';
const SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTES}/search-contact`;
const GET_CONTACTS_FOR_DM_LIST_ROUTE = `${CONTACT_ROUTES}/get-contacts-for-dm-list`;
const GET_ALL_CONTACTS = `${CONTACT_ROUTES}/get-all-contacts`;

// Messages routes
const MESSAGES_ROUTES = 'api/messages';
const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
const UPLOAD_FILES_ROUTE = `${MESSAGES_ROUTES}/upload-file`;

const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
}

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
})

const signUpSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match'),
})

const userInfoSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
})

export {
  // constants
  HOST,
  AUTH_ROUTES,
  SIGN_UP_ROUTE,
  USER_INFO_ROUTE,
  UPDATE_USER_INFO_ROUTE,
  LOGIN_ROUTE,
  LOG_OUT_ROUTE,
  SEARCH_CONTACT_ROUTE,
  GET_MESSAGES_ROUTE,
  GET_CONTACTS_FOR_DM_LIST_ROUTE,
  UPLOAD_FILES_ROUTE,
  GET_ALL_CONTACTS,

  // animation
  animationDefaultOptions,

  // schemas
  loginSchema,
  signUpSchema,
  userInfoSchema,
}

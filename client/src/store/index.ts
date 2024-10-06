
import { create } from 'zustand';
import { AuthSlice, authSlice } from './auth-slice';

const useStore = create<AuthSlice>((...args) => ({
  ...authSlice(...args),
}));

export { useStore }

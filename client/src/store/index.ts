
import { create } from 'zustand';
import { AuthSlice, authSlice } from './auth-slice';
import { ChatSlice, chatSlice } from './chat-slice';

type Store = AuthSlice & ChatSlice

const useStore = create<Store>((...args) => ({
  ...authSlice(...args),
  ...chatSlice(...args),
}));

export { useStore }

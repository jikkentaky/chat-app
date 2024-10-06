import { UserInfo } from '@/types/user-info'
import { StateCreator } from 'zustand'

type AuthSlice = {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
}

const authSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
})

export type { AuthSlice }
export { authSlice }


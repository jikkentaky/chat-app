import { useStore } from "@/store"

const Profile = () => {
  const { userInfo } = useStore()

  return <div>{userInfo?.email}</div>
}

export { Profile }

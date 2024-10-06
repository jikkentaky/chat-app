import { useStore } from "@/store";
import { APP_ROUTE } from "@/types/enums/route";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { userInfo } = useStore();

  return userInfo ? <Navigate to={APP_ROUTE.CHAT} /> : children;
};

export { PublicRoute };

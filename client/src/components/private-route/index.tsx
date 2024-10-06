import { useStore } from "@/store";
import { APP_ROUTE } from "@/types/enums/route";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { userInfo } = useStore();
  return userInfo ? children : <Navigate to={APP_ROUTE.AUTH} />;
};

export { PrivateRoute }

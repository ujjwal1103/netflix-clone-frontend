import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Navigate to={"/"} /> : <>{children}</>;
};

export default ProtectedRoute;

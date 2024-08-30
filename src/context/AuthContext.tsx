import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, logoutUser } from "../config/authService";
import { request } from "../config/api.config";

interface AuthContextType {
  user: any;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  getUser: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(
    (localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")!)) ||
      null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    try {
      const response = await request.get("/auth/user");
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.error || error.message);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const data = await registerUser(userData);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw new Error(error.response?.data?.error || error.message);
    }
  };

  const logout = (): void => {
    logoutUser()
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user),
      loading,
      getUser,
    }),
    [user, loading, getUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

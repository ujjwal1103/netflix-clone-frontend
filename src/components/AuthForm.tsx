import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
interface AuthFormProps {
  variant: "login" | "signUp";
}

type LoginFormData = z.infer<typeof loginSchema>;

const AuthForm = ({ variant }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login, register: signUp } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isLogin = variant === "login";

  const onSubmit: SubmitHandler<LoginFormData> = async (data: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setServerError(null);

    try {
      if (isLogin) {
        await login(data);
      } else {
        await signUp(data);
      }
    } catch (error: any) {
      console.log(error)
      setServerError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-black bg-opacity-70 space-y-4 p-7 h-2/3 w-96"
    >
      <div>
        <h1 className="text-3xl font-bold mb-5">
          {isLogin ? "Sign In" : "Create New Account"}
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="text"
          placeholder="Enter your email"
          className="p-2 bg-black bg-opacity-60 border border-zinc-600"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className="p-2 bg-black bg-opacity-60 border border-zinc-600"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {serverError && (
        <div className="text-red-500 text-sm mb-4">{serverError}</div>
      )}

      <div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 p-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </div>

      <div className="text-center">
        {isLogin ? (
          <p>
            New to Netflix?
            <span className="hover:underline cursor-pointer">
              <Link to="/new-account"> Sign up now.</Link>
            </span>
          </p>
        ) : (
          <p>
            Already on Netflix?
            <span className="hover:underline cursor-pointer">
              <Link to="/login"> Sign In now.</Link>
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;

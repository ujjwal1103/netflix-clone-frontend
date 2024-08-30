import AuthForm from "../../components/AuthForm";

const Login = () => {
  return (
    <div className="h-dvh p-4 w-screen">
      <div className="bg h-full w-full flex items-center justify-center">
        <AuthForm variant="login" />
      </div>
    </div>
  );
};

export default Login;

import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { MovieProvider } from "../context/MovieContext";

const RootLayout = () => {
  return (
    <MovieProvider>
      <div className="h-dvh max-w-screen flex flex-col justify-between">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </MovieProvider>
  );
};

export default RootLayout;

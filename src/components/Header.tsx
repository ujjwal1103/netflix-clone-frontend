import { Link } from "react-router-dom";
import netflixLogo from "../assets/NetflixLogoSvg.svg";
import { useAuth } from "../context/AuthContext";
import SearchMovie from "./SearchMovie";
import { Menu } from "lucide-react";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-[#0000002d] h-[68px] w-screen z-[100] px-4 md:px-14 fixed top-0 left-0 text-white flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-10">
        <Link to="/">
          <img
            src={netflixLogo}
            alt="Netflix Logo"
            width={92}
            height={31}
            className="object-contain"
          />
        </Link>

        <nav className="flex gap-2 md:gap-3 text-sm items-center">
          <SearchMovie />
          {isAuthenticated && (
            <Link to="/favorites" className="hidden sm:block text-sm w-32">
              My Favorites
            </Link>
          )}
        </nav>
      </div>

      {!isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <Link to={"/login"} className="bg-red-600 px-3 py-1 rounded">
            Sign In
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-2 md:space-x-4">
          <p className="hidden sm:block">{user?.email}</p>
          <button
            className="bg-red-600 px-3 py-1 rounded hidden md:block"
            onClick={logout}
          >
            Logout
          </button>

          <div className="group relative md:hidden">
            <div>
              <Menu />
            </div>
            <div className="hidden group-hover:flex mt-3 absolute right-0 bg-zinc-950 p-2 flex-col gap-2">
              <p className="block">{user?.email}</p>
              {isAuthenticated && (
                <Link to="/favorites" className="block  w-32">
                  My Favorites
                </Link>
              )}
              <button className="text-left text-red-600" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

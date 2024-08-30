import { Routes, Route } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/home/Home";
import Favorites from "./pages/favorites/Favorites";
import SingleMovie from "./pages/movie/SingleMovie";
import ProtectedRoute from "./Layout/ProtectedRoute";
import { WildCard } from "./pages/wildCard/WildCard";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="new-account" element={<Register />} />
      </Route>
      <Route element={<RootLayout />}>
        <Route path="" element={<Home />} />
        <Route path="movie/:movieId" element={<SingleMovie />} />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<WildCard />} />
    </Routes>
  );
}

export default App;

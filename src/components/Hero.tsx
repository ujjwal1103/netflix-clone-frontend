import image1 from "../assets/avenger.jpg";
import image2 from "../assets/batman.jpg";
import image3 from "../assets/spider.jpg";
import image4 from "../assets/joker.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Info, Play } from "lucide-react";

import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import AddToFavBtn from "./AddToFavBtn";
import { useAuth } from "../context/AuthContext";

const images = [
  {
    _id: "66cf558de43b71920c0cab7c",
    title: "JOKER",
    img: image4,
  },
  {
    _id: "66cf558de43b71920c0cab7b",
    title: "AVENGERS",
    img: image1,
  },
  {
    _id: "66cf558de43b71920c0cab32",
    title: "THE DARK KNIGHT",
    img: image2,
  },
  {
    _id: "66cf558de43b71920c0cab41",
    title: "Spider-Man Spider-Verse",
    img: image3,
  },
];

const Hero = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="max-w-screen md:h-dvh h-72 relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          enabled: false,
        }}
        loop={true}
        navigation={false}
        modules={[Autoplay]}
        className="h-full"
      >
        {images.map((movie) => (
          <SwiperSlide key={movie._id}>
            <img
              src={movie.img}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute hidden md:block md:bottom-52 bottom-24 space-y-3 px-10 w-full">
              <h1 className="md:text-7xl drop-shadow-xl font-semibold uppercase shadow-slate-50">
                {movie.title}
              </h1>
              <div className="flex gap-2">
                <button className="px-3  py-2  gap-1 flex hover:opacity-90 items-center justify-center text-black font-semibold bg-zinc-50 rounded-md">
                  <Play size={20} fill="black" className="size-3" />{" "}
                  <span>Play</span>
                </button>
                <Link
                  to={`/movie/${movie._id}`}
                  className="px-3 py-2 gap-1 flex items-center justify-center text-white shadow-lg font-semibold bg-zinc-950 bg-opacity-40 hover:bg-opacity-60 rounded-md"
                >
                  <Info size={20} /> <span> More Info </span>
                </Link>
                {isAuthenticated && <AddToFavBtn movieId={movie._id} />}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

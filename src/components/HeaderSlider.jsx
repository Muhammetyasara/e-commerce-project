import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow({ onClick }) {
  return (
    <button onClick={onClick} className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
      <img src="/src/assets/images/arrow-left.png" alt="Previous" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button onClick={onClick} className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
      <img src="/src/assets/images/arrow-right.png" alt="Next" />
    </button>
  );
}

export default function HeaderSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <section className="relative">
      <Slider {...settings}>
        <Slide image="/src/assets/images/slide-1.png" />
        <Slide image="/src/assets/images/slide-2.png" />
      </Slider>
    </section>
  );
}

function Slide({ image }) {
  return (
    <div
      className="
        h-[70vh]
        lg:h-screen
        bg-no-repeat
        bg-cover
        bg-center
        flex
        items-center
        justify-center
      "
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-6 px-6 text-white">
          <span className="text-sm tracking-widest">
            SUMMER 2020
          </span>

          <h2 className="text-3xl font-bold flex flex-wrap w-1/2">
            NEW COLLECTION
          </h2>

          <p className="text-md flex flex-wrap w-1/2">
            We know how large objects will act, but things on a small scale.
          </p>

          <button className="mt-2 px-8 py-3 bg-green-400 text-white text-md font-medium">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}

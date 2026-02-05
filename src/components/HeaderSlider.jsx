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
      <div className="w-full h-full flex items-center justify-center lg:justify-start lg:pl-52">
        <div className="flex flex-col items-center text-center gap-6 px-6 text-white lg:text-start lg:items-start lg:gap-10 lg:w-full">
          <span className="text-md font-bold">
            SUMMER 2020
          </span>

          <h2 className="text-3xl font-bold flex justify-center w-1/2 lg:w-full lg:text-5xl lg:justify-start">
            NEW COLLECTION
          </h2>

          <p className="text-md flex flex-wrap w-3/4 lg:w-1/5 font-medium">
            We know how large objects will act, but things on a small scale.
          </p>

          <button className="mt-2 px-8 py-3 bg-green-500 text-white text-md font-semibold">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}

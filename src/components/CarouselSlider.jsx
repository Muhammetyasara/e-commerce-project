import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
    >
      <img src="/src/assets/images/arrow-left.png" alt="Previous" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
    >
      <img src="/src/assets/images/arrow-right.png" alt="Next" />
    </button>
  );
}

export default function CarouselSlider() {
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
        <Slide
          image="/src/assets/images/slide-3.png"
          bottomImage="/src/assets/images/slide-3-inner.png"
        />
        <Slide image="/src/assets/images/slide-2.png" />
      </Slider>
    </section>
  );
}

function Slide({ image, bottomImage }) {
  return (
    <div
      className="
        relative
        h-[1218px]
        bg-no-repeat
        bg-cover
        bg-center
        flex
        items-center
        justify-center
        pt-20
      "
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full h-full flex items-start pt-36 lg:items-center lg:pl-80 lg:pt-0 lg:text-6xl">
        <div className="flex flex-col items-center text-center gap-12 px-6 text-white z-10 lg:items-start">
          <span className="text-sm tracking-widest font-semibold">
            SUMMER 2020
          </span>

          <h2 className="text-3xl font-bold w-3/4 lg:text-start lg:text-5xl lg:w-2/3">
            Vita Classic Product
          </h2>

          <p className="text-md w-2/3 font-medium lg:text-start lg:text-sm">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <span className="font-bold lg:text-sm">$16.48</span>

            <button className="px-1 bg-green-500 text-white rounded-md">
              <p className="px-4 py-3 text-xs font-bold">ADD TO CHART</p>
            </button>
          </div>
        </div>
      </div>

      {bottomImage && (
        <img
          src={bottomImage}
          alt=""
          className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            z-0
            px-2
            lg:translate-x-1/4
          "
        />
      )}
    </div>
  );
}

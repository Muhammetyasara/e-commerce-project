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

export default function ProductPageSlider({ onChange }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_, next) => {
      onChange?.(next);
    },
  };

  return (
    <section className="relative">
      <Slider {...settings}>
        <Slide image="/src/assets/images/product-page-1.png" />
        <Slide image="/src/assets/images/product-page-2.png" />
      </Slider>
    </section>
  );
}

function Slide({ image }) {
  return (
    <div
      className="
        h-[50vh]
        w-full
        lg:h-[50vh]
        bg-no-repeat
        bg-cover
        bg-center
        flex
        items-center
        justify-center
      "
      style={{ backgroundImage: `url(${image})` }}
    >
    </div>
  );
}

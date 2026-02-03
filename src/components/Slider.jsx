import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        className="w-full"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <SlideItem />
        </SwiperSlide>

        <SwiperSlide>
          <SlideItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function SlideItem() {
  return (
    <div className="flex flex-col gap-4 border p-4 h-full">
      <div className="h-40 bg-gray-100" />
      <h3 className="text-sm font-medium">Featured Product</h3>
      <p className="text-sm text-gray-600">
        Short product description goes here.
      </p>
      <button className="mt-auto border py-2 text-sm">View Product</button>
    </div>
  );
}
